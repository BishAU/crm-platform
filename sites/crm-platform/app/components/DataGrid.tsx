'use client';

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { TableCellsIcon, Squares2X2Icon, MagnifyingGlassIcon, FunnelIcon, ChevronUpIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import DetailView from './DetailView';
import GalleryView from './DataGrid/GalleryView';
import { Column, DataGridProps } from './DataGrid/types';
import { useRouter } from 'next/navigation';
import { getFieldOrder, saveFieldOrder } from '../lib/field-visibility-client';

export default function DataGrid({
  entityType,
  columns,
  rows,
  onSave,
  loading = false,
  pagination,
  onPageChange,
  onSearch,
  onSort
}: DataGridProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'gallery'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState<Record<string, string>>({});
  const [showFilters, setShowFilters] = useState(false);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [columnOrder, setColumnOrder] = useState<string[]>(() => 
    getFieldOrder(entityType, columns.map(col => col.field))
  );
  const router = useRouter();

  const getVisibleFields = (entityType: string, columns: Column[]) => {
    return columns.filter(col => col.active !== false).map(col => col.field);
  };

  const visibleColumns = columns.filter(col =>
    getVisibleFields(entityType, columns).includes(col.field)
  );

  const handleRowClick = (record: any) => {
    if (entityType === 'marketingList') {
      router.push(`/marketing/lists/${record.id}`);
    } else {
      router.push(`/${toKebabCase(entityType)}/${record.id}`);
    }
  };

  const handleSave = async (updatedRecord: any) => {
    if (onSave) {
      await onSave(updatedRecord);
    }
  };

  const handleSort = (field: string) => {
    const newOrder = sortedColumn === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortedColumn(field);
    setSortOrder(newOrder);
    if (onSort) {
      onSort(field, newOrder);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newColumnOrder = Array.from(columnOrder);
    const [removed] = newColumnOrder.splice(result.source.index, 1);
    newColumnOrder.splice(result.destination.index, 0, removed);

    setColumnOrder(newColumnOrder);
    saveFieldOrder(entityType, newColumnOrder);
  };

  function toKebabCase(str: string) {
    const irregularPlurals: Record<string, string> = {
      'authority': 'authorities',
      'person': 'people'
    };

    const kebab = str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();

    for (const [singular, plural] of Object.entries(irregularPlurals)) {
      if (kebab.endsWith(singular)) {
        return kebab.slice(0, -singular.length) + plural;
      }
    }

    return kebab.endsWith('s') ? kebab : `${kebab}s`;
  }

  const orderedColumns = visibleColumns.sort((a, b) => 
    columnOrder.indexOf(a.field) - columnOrder.indexOf(b.field)
  );

  // Ensure rows is always an array
  const safeRows = Array.isArray(rows) ? rows : [];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-ocean-100">
      {/* Header */}
      <div className="px-4 py-3 border-b border-ocean-100 bg-ocean-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* View toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-ocean-100 text-ocean-800'
                    : 'text-ocean-600 hover:bg-ocean-50'
                }`}
              >
                <TableCellsIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('gallery')}
                className={`p-2 rounded-md ${
                  viewMode === 'gallery'
                    ? 'bg-ocean-100 text-ocean-800'
                    : 'text-ocean-600 hover:bg-ocean-50'
                }`}
              >
                <Squares2X2Icon className="h-5 w-5" />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-ocean-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-ocean-400" />
            </div>
          </div>

          {/* Filters */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-md ${
              showFilters
                ? 'bg-ocean-100 text-ocean-800'
                : 'text-ocean-600 hover:bg-ocean-50'
            }`}
          >
            <FunnelIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-ocean-50 rounded-md border border-ocean-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {columns.map((column) => (
                <div key={column.field}>
                  <label className="block text-sm font-medium text-ocean-700 mb-1">
                    {column.headerName}
                  </label>
                  <input
                    type="text"
                    value={filterValues[column.field] || ''}
                    onChange={(e) =>
                      setFilterValues((prev) => ({
                        ...prev,
                        [column.field]: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-ocean-200 rounded-md focus:outline-none focus:ring-2 focus:ring-ocean-500 focus:border-ocean-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
          </div>
        ) : viewMode === 'grid' ? (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="min-w-full divide-y divide-ocean-100">
              <Droppable droppableId="columns" direction="horizontal">
                {(provided) => (
                  <table className="min-w-full divide-y divide-ocean-100">
                    <thead className="bg-ocean-50" ref={provided.innerRef}>
                      <tr>
                        {orderedColumns.map((column, index) => (
                          <Draggable key={column.field} draggableId={column.field} index={index}>
                            {(provided) => (
                              <th
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-ocean-700 uppercase tracking-wider cursor-pointer hover:bg-ocean-100"
                                onClick={() => handleSort(column.field)}
                              >
                                <div className="flex items-center space-x-1">
                                  <span>{column.headerName}</span>
                                  {sortedColumn === column.field && (
                                    <ChevronUpIcon
                                      className={`h-4 w-4 transform ${
                                        sortOrder === 'desc' ? 'rotate-180' : ''
                                      }`}
                                    />
                                  )}
                                </div>
                              </th>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-ocean-100">
                    {safeRows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          role="row"
                          onClick={() => handleRowClick(row)}
                          className="hover:bg-ocean-50 cursor-pointer"
                          aria-label={`row ${rowIndex + 1}`}
                        >
                          {orderedColumns.map((column) => (
                            <td
                              key={column.field}
                              className="px-6 py-4 whitespace-nowrap text-sm text-ocean-800"
                            >
                              {column.renderCell
                                ? column.renderCell(row)
                                : row[column.field]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        ) : (
          <GalleryView
            items={safeRows}
            columns={visibleColumns}
            onItemClick={handleRowClick}
            entityType={entityType}
          />
        )}
      </div>
      {/* Pagination */}
      {pagination && (
        <div className="px-4 py-3 border-t border-ocean-100 bg-ocean-50 flex items-center justify-between">
          <div className="text-sm text-ocean-700">
            Page {pagination.page} of {pagination.totalPages} ({pagination.totalItems} items)
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className={`p-2 rounded-md ${
                pagination.page === 1
                  ? 'text-ocean-300 cursor-not-allowed'
                  : 'text-ocean-600 hover:bg-ocean-50'
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.totalPages}
              className={`p-2 rounded-md ${
                pagination.page === pagination.totalPages
                  ? 'text-ocean-300 cursor-not-allowed'
                  : 'text-ocean-600 hover:bg-ocean-50'
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
