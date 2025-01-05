'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Grid, List, Search, ArrowUpDown, Edit } from 'lucide-react';
import Link from 'next/link';

interface Column {
  field: string;
  header: string;
  sortable?: boolean;
  hidden?: boolean;
  format?: (value: any) => string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  pageSize?: number;
  totalItems?: number;
}

interface DataGridProps {
  data: any[];
  columns: Column[];
  entityType: string;
  onPageChange?: (page: number) => void;
  pagination?: PaginationInfo;
  view?: 'grid' | 'list';
  onViewChange?: (view: 'grid' | 'list') => void;
  onSearch?: (term: string) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  onSave?: (record: Record<string, any>) => Promise<void>;
  loading?: boolean;
}

export default function DataGrid({
  data,
  columns,
  entityType,
  onPageChange,
  pagination = { currentPage: 1, totalPages: 1 },
  view = 'grid',
  onViewChange,
  onSearch,
  onSort,
  onSave,
  loading = false
}: DataGridProps) {
  const [selectedView, setSelectedView] = useState(view);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const handleViewChange = (newView: 'grid' | 'list') => {
    setSelectedView(newView);
    onViewChange?.(newView);
  };

  const handleSort = (field: string) => {
    const newOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    onSort?.(field, newOrder);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch?.(term);
  };
const renderGridView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {data.map((item, index) => (
      <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
        <div className="aspect-video w-full relative">
          {item.media_images && Array.isArray(item.media_images) && item.media_images.length > 0 ? (
            <img
              src={item.media_images[0]}
              alt={`Image for ${item.title || 'item'}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="/error/cof_logo.png"
              alt="Clean Ocean Foundation"
              className="w-full h-full object-contain bg-white p-6"
            />
          )}
          <Link
            href={`/${entityType}/${item.id}`}
            className="absolute top-2 right-2 p-2 bg-white/80 text-gray-500 hover:text-blue-600 hover:bg-white rounded-full shadow-sm"
          >
            <Edit className="w-4 h-4" />
          </Link>
        </div>
        <div className="p-4">
          {columns.filter(col => !col.hidden && col.field !== 'media_images' && col.field !== 'media_video').map((column) => (
            <div key={column.field} className="mb-2">
              <span className="font-semibold text-ocean-900">{column.header}: </span>
              <span className="text-ocean-800">
                {column.format ? column.format(item[column.field]) : item[column.field]}
              </span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

  const renderListView = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="w-10 px-4 py-3"></th>
            {columns.filter(col => !col.hidden).map((column) => (
              <th
                key={column.field}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => column.sortable && handleSort(column.field)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.header}</span>
                  {column.sortable && (
                    <ArrowUpDown className={`w-4 h-4 ${
                      sortField === column.field ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="w-10 px-4 py-4">
                <Link
                  href={`/${entityType}/${item.id}`}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </td>
              {columns.filter(col => !col.hidden).map((column) => (
                <td key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {column.format ? column.format(item[column.field]) : item[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewChange('grid')}
              className={`p-2 rounded ${
                selectedView === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleViewChange('list')}
              className={`p-2 rounded ${
                selectedView === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
          {onSearch && (
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          )}
        </div>
        {pagination.totalPages > 1 && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onPageChange?.(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => onPageChange?.(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        selectedView === 'grid' ? renderGridView() : renderListView()
      )}
    </div>
  );
}
