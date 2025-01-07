'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DataGrid from '@components/DataGrid';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { fetchData } from '@lib/api';
import { Prisma } from '@prisma/client';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function SupportTicketsPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const fetchTickets = async (params: {
    page: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        ...(params.search && { search: params.search }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder })
      });

      const data = await fetchData(`/api/support/tickets?${queryParams}`);
      setTickets(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching support tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTickets({
      page: currentPage,
      search: searchTerm,
      sortBy: sortField,
      sortOrder
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/support/tickets/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update support ticket');
      }

      await fetchTickets({
        page: currentPage,
        search: searchTerm,
        sortBy: sortField,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating support ticket:', error);
      throw error;
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

  const defaultColumns = [
    { field: 'title', header: 'Title', sortable: true },
    { field: 'description', header: 'Description', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'createdAt', header: 'Created At', hidden: true, format: (value: string) => new Date(value).toLocaleString() },
    { field: 'updatedAt', header: 'Updated At', hidden: true, format: (value: string) => new Date(value).toLocaleString() },
    { field: 'id', header: 'ID', hidden: true }
  ];

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Support Tickets</h1>
        <DataGrid
          data={tickets}
          columns={defaultColumns}
          pagination={{
            currentPage,
            totalPages,
            totalItems
          }}
          onPageChange={setCurrentPage}
          view={view}
          onViewChange={setView}
          onSearch={handleSearch}
          onSort={handleSort}
          onSave={handleSave}
          loading={loading}
        />
      </div>
    </AuthenticatedLayout>
  );
}