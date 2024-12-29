'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

interface FilterOption {
  field: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'boolean';
  options?: { value: string; label: string }[];
}

interface SearchAndFilterProps {
  onSearch: (searchTerm: string) => void;
  onFilter: (filters: Record<string, any>) => void;
  filterOptions: FilterOption[];
  placeholder?: string;
}

export default function SearchAndFilter({
  onSearch,
  onFilter,
  filterOptions,
  placeholder = 'Search...',
}: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (field: string, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={placeholder}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium ${
            showFilters ? 'text-white bg-indigo-600 border-indigo-600' : 'text-gray-700 bg-white'
          } hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
        >
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filters
        </button>
      </div>

      {showFilters && (
        <div className="bg-white p-4 rounded-md shadow border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filterOptions.map((option) => (
              <div key={option.field} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {option.label}
                </label>
                {option.type === 'select' ? (
                  <select
                    value={filters[option.field] || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="">All</option>
                    {option.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                ) : option.type === 'date' ? (
                  <input
                    type="date"
                    value={filters[option.field] || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                ) : (
                  <input
                    type="text"
                    value={filters[option.field] || ''}
                    onChange={(e) => handleFilterChange(option.field, e.target.value)}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
