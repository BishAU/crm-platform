'use client';

import { useState } from 'react';
import { Column, GalleryViewProps } from './types';

export default function GalleryView({ items, columns, onItemClick, entityType }: GalleryViewProps) {
  const primaryColumn = columns.find(col => col.isPrimary) || columns[0];
  const visibleColumns = columns.filter(col => 
    !col.isPrimary && 
    col.active !== false
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-ocean-200 overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
          onClick={() => onItemClick(item)}
        >
          {/* Image or Icon */}
          <div className="aspect-video bg-ocean-50 flex items-center justify-center">
            {columns.find(col => col.isImage)?.renderCell?.(item[columns.find(col => col.isImage)!.field]) || (
              <div className="text-4xl text-ocean-400">
                {item[primaryColumn.field]?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-medium text-ocean-900 mb-2">
              {item[primaryColumn.field]}
            </h3>
            <dl className="space-y-1">
              {visibleColumns.map(column => (
                <div key={column.field} className="flex text-sm">
                  <dt className="text-ocean-500 w-1/3">
                    {column.headerName}:
                  </dt>
                  <dd className="text-ocean-900 w-2/3">
                    {column.renderCell ? column.renderCell(item[column.field]) : item[column.field] || '-'}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}