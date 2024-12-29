'use client';

import DataGrid from '../components/DataGrid';
import { useEffect, useState } from 'react';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { PencilIcon } from '@heroicons/react/24/outline';

interface Outfall {
  id: string;
  name: string;
  description: string;
  type: string;
  facilityId: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function OutfallsPage() {
  const [outfalls, setOutfalls] = useState<Outfall[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('outfallName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchOutfalls = async (params: {
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

      const response = await fetch(`/api/outfalls?${queryParams}`);
      const data = await response.json();
      setOutfalls(data.data || []);
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }));
    } catch (error) {
      console.error('Error fetching outfalls:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfalls({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      sortBy,
      sortOrder
    });
  }, [pagination.page, pagination.limit, searchTerm, sortBy, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/outfalls/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update outfall');
      }

      // Refresh the current page
      fetchOutfalls({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating outfall:', error);
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

  const columns = [
    { 
      field: 'name', 
      headerName: 'Name', 
      isPrimary: true, 
      renderCell: (value: any) => {
        return (
          <div className="group relative">
            <a 
              href={`/outfalls/${value.id}`} 
              className="text-ocean-600 hover:text-ocean-800 inline-flex items-center"
            >
              <span>{value.name}</span>
              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center">
                <PencilIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">Edit</span>
              </div>
            </a>
          </div>
        );
      } 
    },
    { field: 'description', headerName: 'Description' },
    { field: 'type', headerName: 'Type' },
    { field: 'facilityId', headerName: 'Facility ID' },
    { field: 'latitude', headerName: 'Latitude' },
    { field: 'longitude', headerName: 'Longitude' },
    { field: 'createdAt', headerName: 'Created At', active: false },
    { field: 'updatedAt', headerName: 'Updated At', active: false },
    { field: 'id', headerName: 'ID', active: false },
  ];

  if (loading && !outfalls.length) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Outfalls</h1>
        <DataGrid
          rows={outfalls}
          columns={columns}
          entityType="outfall"
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
