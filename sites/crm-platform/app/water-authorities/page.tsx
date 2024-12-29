'use client';

import DataGrid from '../components/DataGrid';
import { useEffect, useState } from 'react';

interface WaterAuthority {
  id: string;
  authorityName: string;
  name: string; // For display purposes
  associatedIndigenousCommunities: string;
  activeStatus: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

import AuthenticatedLayout from '../components/AuthenticatedLayout';

export default function WaterAuthoritiesPage() {
  const [waterAuthorities, setWaterAuthorities] = useState<WaterAuthority[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('authorityName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const fetchWaterAuthorities = async (params: {
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

      const response = await fetch(`/api/water-authorities?${queryParams}`);
      const data = await response.json();
      setWaterAuthorities(data.data || []);
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }));
    } catch (error) {
      console.error('Error fetching water authorities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWaterAuthorities({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      sortBy,
      sortOrder
    });
  }, [pagination.page, pagination.limit, searchTerm, sortBy, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/water-authorities/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update water authority');
      }

      // Refresh the current page
      fetchWaterAuthorities({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating water authority:', error);
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
    { field: 'authorityName', headerName: 'Authority Name', isPrimary: true },
    { field: 'associatedIndigenousCommunities', headerName: 'Associated Indigenous Communities' },
    { field: 'createdAt', headerName: 'Date Created', active: false },
    { field: 'updatedAt', headerName: 'Date Updated', active: false },
    { field: 'activeStatus', headerName: 'Active Status' },
    { field: 'id', headerName: 'ID', active: false },
  ];

  if (loading && !waterAuthorities.length) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Water Authorities</h1>
      <DataGrid
        rows={waterAuthorities}
        columns={columns}
        entityType="waterAuthority"
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
