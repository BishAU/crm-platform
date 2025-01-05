'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DataGrid from '../components/DataGrid';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { getFieldOrder } from '../lib/field-visibility-client';

interface Observation {
  id: string;
  title: string;
  description: string;
  type: string;
  contact_name: string;
  contact_email: string;
  contact_phone?: string;
  media_images: string[];
  media_video?: string;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export default function ObservationsPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

  const [observations, setObservations] = useState<Observation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const fetchObservations = async (params: {
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

      const response = await fetch(`/api/observations?${queryParams}`);
      const data = await response.json();
      setObservations(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching observations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchObservations({
      page: currentPage,
      search: searchTerm,
      sortBy: sortField,
      sortOrder
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/observations/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update observation');
      }

      await fetchObservations({
        page: currentPage,
        search: searchTerm,
        sortBy: sortField,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating observation:', error);
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
    { field: 'type', header: 'Type', sortable: true },
    {
      field: 'observedAt',
      header: 'Observed At',
      sortable: true,
      format: (value: string) => new Date(value).toLocaleString()
    },
    { field: 'contact_name', header: 'Contact Name', sortable: true },
    { field: 'contact_email', header: 'Contact Email', sortable: true },
    { field: 'contact_phone', header: 'Contact Phone', sortable: true },
    { field: 'status', header: 'Status', sortable: true },
    { field: 'source', header: 'Source', sortable: true },
    { field: 'media_images', header: 'Images', hidden: true },
    { field: 'media_video', header: 'Video', hidden: true },
    { field: 'createdAt', header: 'Created At', hidden: true },
    { field: 'updatedAt', header: 'Updated At', hidden: true },
    { field: 'id', header: 'ID', hidden: true }
  ];

  const orderedFields = getFieldOrder('observation', defaultColumns.map(col => col.field));
  const columns = orderedFields.map(field => {
    const col = defaultColumns.find(c => c.field === field);
    return col || { field, header: field, sortable: true };
  });

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Observations</h1>
        <DataGrid
          data={observations}
          columns={columns}
          entityType="observations"
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
