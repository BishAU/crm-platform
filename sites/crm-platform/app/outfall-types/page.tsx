'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';

interface OutfallType {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function OutfallTypesPage() {
  const [types, setTypes] = useState<OutfallType[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchTypes = async (params: {
    page: number;
    limit: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.limit.toString(),
        ...(params.search && { search: params.search }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder })
      });

      const response = await fetch(`/api/outfall-types?${queryParams}`);
      const data = await response.json();
      setTypes(data.data || []);
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }));
    } catch (error) {
      console.error('Error fetching outfall types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      sortBy,
      sortOrder
    });
  }, [pagination.page, pagination.limit, searchTerm, sortBy, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/outfall-types/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update outfall type');
      }

      // Refresh the current page
      fetchTypes({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating outfall type:', error);
      throw error;
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPagination(prev => ({
      ...prev,
      page: 1 // Reset to first page on new search
    }));
  };

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortBy(field);
    setSortOrder(order);
  };

  const defaultColumns = [
    { field: 'name', headerName: 'Name', isPrimary: true },
    { field: 'description', headerName: 'Description' },
    { field: 'createdAt', headerName: 'Created At', active: false },
    { field: 'updatedAt', headerName: 'Updated At', active: false },
    { field: 'id', headerName: 'ID', active: false },
  ];

  // Get the ordered field names from localStorage or use default order
  const orderedFields = getFieldOrder('outfall-type', defaultColumns.map(col => col.field));

  // Reorder columns based on the saved field order
  const columns = orderedFields
    .map(field => defaultColumns.find(col => col.field === field))
    .filter((col): col is typeof defaultColumns[0] => col !== undefined);

  if (loading && !types.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Outfall Types</h1>
        <DataGrid
          rows={types}
          columns={columns}
          entityType="outfall-type"
          onSave={handleSave}
          loading={loading}
          pagination={{
            page: pagination.page,
            pageSize: pagination.limit,
            totalPages: pagination.totalPages,
            totalItems: pagination.total
          }}
          onPageChange={handlePageChange}
          onSearch={handleSearch}
          onSort={handleSort}
        />
      </div>
    </AuthenticatedLayout>
  );
}
