'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DataGrid from '../components/DataGrid';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { getFieldOrder } from '../lib/field-visibility-client';

interface LandCouncil {
  id: string;
  name: string;
  email: string;
  lgas: string;
  outfallCount: number;
  outfalls: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

export default function LandCouncilsPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

  const [landCouncils, setLandCouncils] = useState<LandCouncil[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const fetchLandCouncils = async (params: {
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

      const response = await fetch(`/api/land-councils?${queryParams}`);
      const data = await response.json();
      setLandCouncils(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching land councils:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchLandCouncils({
      page: currentPage,
      search: searchTerm,
      sortBy: sortField,
      sortOrder
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sortField, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/land-councils/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update land council');
      }

      await fetchLandCouncils({
        page: currentPage,
        search: searchTerm,
        sortBy: sortField,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating land council:', error);
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
    { field: 'name', header: 'Name', sortable: true },
    { field: 'email', header: 'Email', sortable: true },
    { field: 'phone', header: 'Phone', sortable: true },
    { field: 'lgas', header: 'Local Government Areas', sortable: true },
    { field: 'outfallCount', header: 'Outfall Count', sortable: true },
    { field: 'outfalls', header: 'Outfalls', sortable: true },
    { field: 'createdAt', header: 'Created At', hidden: true },
    { field: 'updatedAt', header: 'Updated At', hidden: true },
    { field: 'id', header: 'ID', hidden: true }
  ];

  const orderedFields = getFieldOrder('landCouncil', defaultColumns.map(col => col.field));
  const columns = orderedFields.map(field => {
    const col = defaultColumns.find(c => c.field === field);
    return col || { field, header: field, sortable: true };
  });

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Land Councils</h1>
        <DataGrid
          data={landCouncils}
          columns={columns}
          entityType="land-councils"
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