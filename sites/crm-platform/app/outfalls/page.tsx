'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import DataGrid from '../components/DataGrid';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { getFieldOrder } from '../lib/field-visibility-client';

interface Outfall {
  id: string;
  outfallName: string;
  outfall: string;
  type: string;
  authority: string;
  state: string;
  latitude: string;
  longitude: string;
  indigenousNation: string;
  landCouncil: string;
  contact_name: string;
  contact_email: string;
  createdAt: string;
  updatedAt: string;
}

export default function OutfallsPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

  const [outfalls, setOutfalls] = useState<Outfall[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('outfallName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);

  const fetchOutfalls = async (params: {
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

      const response = await fetch(`/api/outfalls?${queryParams}`);
      const data = await response.json();
      setOutfalls(data.items || []);
      setTotalPages(data.totalPages || 1);
      setTotalItems(data.totalItems || 0);
    } catch (error) {
      console.error('Error fetching outfalls:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchOutfalls({
      page: currentPage,
      search: searchTerm,
      sortBy: sortField,
      sortOrder
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm, sortField, sortOrder]);

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

      await fetchOutfalls({
        page: currentPage,
        search: searchTerm,
        sortBy: sortField,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating outfall:', error);
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
    { field: 'outfallName', header: 'Name', sortable: true },
    { field: 'outfall', header: 'Outfall ID', sortable: true },
    { field: 'type', header: 'Type', sortable: true },
    { field: 'authority', header: 'Authority', sortable: true },
    { field: 'state', header: 'State', sortable: true },
    { field: 'indigenousNation', header: 'Indigenous Nation', sortable: true },
    { field: 'landCouncil', header: 'Land Council', sortable: true },
    { field: 'contact_name', header: 'Contact Name', sortable: true },
    { field: 'contact_email', header: 'Contact Email', sortable: true },
    { field: 'latitude', header: 'Latitude', hidden: true },
    { field: 'longitude', header: 'Longitude', hidden: true },
    { field: 'createdAt', header: 'Created At', hidden: true },
    { field: 'updatedAt', header: 'Updated At', hidden: true },
    { field: 'id', header: 'ID', hidden: true }
  ];

  const orderedFields = getFieldOrder('outfall', defaultColumns.map(col => col.field));
  const columns = orderedFields.map(field => {
    const col = defaultColumns.find(c => c.field === field);
    return col || { field, header: field, sortable: true };
  });

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Outfalls</h1>
        <DataGrid
          data={outfalls}
          columns={columns}
          entityType="outfalls"
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
