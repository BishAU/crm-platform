'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  TableCellsIcon, 
  ViewColumnsIcon, 
  ArrowDownTrayIcon,
  FunnelIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Filter, SavedViewData } from '../../lib/savedViews';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

interface EntityGridProps {
  title: string;
  columns: Column[];
  data: any[];
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Filter[]) => void;
  onPageChange?: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  savedViews?: SavedViewData[];
  onSaveView?: (view: Omit<SavedViewData, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function EntityGrid({
  title,
  columns,
  data,
  onSort,
  onFilter,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 10,
  savedViews = [],
  onSaveView
}: EntityGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [newViewName, setNewViewName] = useState('');

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleSort = (column: string) => {
    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortDirection(newDirection);
    onSort?.(column, newDirection);
  };

  const handleFilter = (newFilters: Filter[]) => {
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange?.(page);
  };

  const exportToCsv = () => {
    const headers = columns.map(col => col.label).join(',');
    const rows = data.map(item => 
      columns.map(col => JSON.stringify(item[col.key])).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-export.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleSaveView = () => {
    if (!newViewName.trim() || !onSaveView) return;
    
    onSaveView({
      name: newViewName,
      entityType: title.toLowerCase(),
      filters,
      sortColumn: sortColumn || null,
      sortDirection: sortDirection || null,
      userId: '', // This will be set by the API
    });
    
    setNewViewName('');
  };

  return (
    <Card>
      <Card.Header>
        <div className="flex items-center justify-between">
          <Card.Title>{title}</Card.Title>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'gallery' : 'grid')}
            >
              {viewMode === 'grid' ? (
                <ViewColumnsIcon className="h-5 w-5" />
              ) : (
                <TableCellsIcon className="h-5 w-5" />
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FunnelIcon className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              onClick={exportToCsv}
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </Card.Header>

      {showFilters && (
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="space-y-4">
            {filters.map((filter, index) => (
              <div key={index} className="flex items-center space-x-2">
                <select
                  value={filter.column}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[index].column = e.target.value;
                    handleFilter(newFilters);
                  }}
                  className="rounded-md border-gray-300"
                >
                  {columns.filter(col => col.filterable).map(col => (
                    <option key={col.key} value={col.key}>{col.label}</option>
                  ))}
                </select>
                <select
                  value={filter.operator}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[index].operator = e.target.value as Filter['operator'];
                    handleFilter(newFilters);
                  }}
                  className="rounded-md border-gray-300"
                >
                  <option value="contains">Contains</option>
                  <option value="notContains">Does not contain</option>
                  <option value="equals">Equals</option>
                  <option value="notEquals">Does not equal</option>
                  <option value="startsWith">Starts with</option>
                  <option value="endsWith">Ends with</option>
                </select>
                <input
                  type="text"
                  value={filter.value}
                  onChange={(e) => {
                    const newFilters = [...filters];
                    newFilters[index].value = e.target.value;
                    handleFilter(newFilters);
                  }}
                  className="rounded-md border-gray-300"
                  placeholder="Value"
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    const newFilters = filters.filter((_, i) => i !== index);
                    handleFilter(newFilters);
                  }}
                >
                  <XMarkIcon className="h-5 w-5" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                handleFilter([...filters, { column: columns[0].key, operator: 'contains', value: '' }]);
              }}
            >
              Add Filter
            </Button>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newViewName}
                onChange={(e) => setNewViewName(e.target.value)}
                className="rounded-md border-gray-300"
                placeholder="View name"
              />
              <Button onClick={handleSaveView}>Save View</Button>
            </div>
          </div>
        </div>
      )}

      <Card.Content>
        {viewMode === 'grid' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map(column => (
                    <th
                      key={column.key}
                      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                        column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                      }`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.label}</span>
                        {column.sortable && sortColumn === column.key && (
                          sortDirection === 'asc' ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index}>
                    {columns.map(column => (
                      <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                        {item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                {columns.map(column => (
                  <div key={column.key} className="mb-2">
                    <span className="font-medium">{column.label}: </span>
                    <span>{item[column.key]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </div>
          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <Button
                key={page}
                variant={page === currentPage ? 'primary' : 'outline'}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
