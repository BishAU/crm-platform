'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DataGrid from '../components/DataGrid';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { getFieldOrder } from '../lib/field-visibility-client';

interface Politician {
  id: string;
  firstName: string;
  lastName: string;
  party: string;
  constituency: string;
  contact: string;
  createdAt: string;
  updatedAt: string;
}

export default function PoliticiansPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

  const [politicians, setPoliticians] = useState<Politician[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('lastName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const fetchPoliticians = async (params: {
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

      const response = await fetch(`/api/politicians?${queryParams}`);
      const data = await response.json();
      setPoliticians(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching politicians:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchPoliticians({
      page: currentPage,
      search: searchTerm,
      sortBy: sortField,
      sortOrder
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/politicians/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update politician');
      }

      await fetchPoliticians({
        page: currentPage,
        search: searchTerm,
        sortBy: sortField,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating politician:', error);
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

  const columns = [
    { field: 'firstName', header: 'First Name', sortable: true },
    { field: 'lastName', header: 'Last Name', sortable: true },
    { field: 'party', header: 'Party', sortable: true },
    { field: 'constituency', header: 'Constituency', sortable: true },
    { field: 'contact', header: 'Contact', sortable: true },
    { field: 'createdAt', header: 'Created At', hidden: true },
    { field: 'updatedAt', header: 'Updated At', hidden: true },
    { field: 'id', header: 'ID', hidden: true }
  ];

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Politicians</h1>
        <DataGrid
          data={politicians}
          columns={columns}
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
