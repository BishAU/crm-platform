'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';
import { v4 as uuidv4 } from 'uuid';
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


interface MarketingCampaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
    endDate: string;
  createdAt: string;
  updatedAt: string;
}

export default function MarketingCampaignsPage() {
  const searchParams = useSearchParams();
  const initialView = (searchParams?.get('view') as 'grid' | 'list') || 'grid';

    const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    {
      id: uuidv4(),
      name: 'Mock Campaign 1',
      description: 'This is a mock marketing campaign.',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: uuidv4(),
      name: 'Mock Campaign 2',
      description: 'This is another mock marketing campaign.',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(campaigns.length);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [view, setView] = useState<'grid' | 'list'>(initialView);
    const [columns, setColumns] = useState<Column[]>([
    { field: 'name', header: 'Name', sortable: true },
    { field: 'description', header: 'Description', sortable: true },
        { field: 'startDate', header: 'Start Date', sortable: true },
        { field: 'endDate', header: 'End Date', sortable: true },
    { field: 'createdAt', header: 'Created At', hidden: true },
    { field: 'updatedAt', header: 'Updated At', hidden: true },
    { field: 'id', header: 'ID', hidden: true },
  ]);


  const handleAddCampaign = () => {
    const newCampaign: MarketingCampaign = {
      id: uuidv4(),
      name: 'New Campaign',
      description: 'New marketing campaign description',
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCampaigns([...campaigns, newCampaign]);
    setTotalItems(campaigns.length + 1);
  };


  useEffect(() => {
    setTotalItems(campaigns.length);
  }, [campaigns]);


  const handleSave = async (updatedRecord: Record<string, any>) => {
    const updatedCampaigns = campaigns.map((campaign) =>
      campaign.id === updatedRecord.id ? { ...campaign, ...updatedRecord, updatedAt: new Date().toISOString() } : campaign
    );
    setCampaigns(updatedCampaigns);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleSort = (field: string, order: 'asc' | 'desc') => {
    setSortField(field);
    setSortOrder(order);
  };

    const handleColumnReorder = (field: string) => {
        const newColumns = [...columns];
        const index = newColumns.findIndex(col => col.field === field);
        if (index > -1) {
            const column = newColumns.splice(index, 1)[0];
            newColumns.push(column);
            setColumns(newColumns);
        }
    };


  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {campaigns.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-video w-full relative">
            <div className="p-4">
              {columns.filter(col => !col.hidden && col.field !== 'media_images' && col.field !== 'media_video').map((column) => (
                <div key={column.field} className="mb-2">
                  <span className="font-semibold text-ocean-900">{column.header}: </span>
                  <span className="text-ocean-800">
                    {column.format ? column.format(item[column.field as keyof MarketingCampaign]) : item[column.field as keyof MarketingCampaign]}
                  </span>
                </div>
              ))}
            </div>
            <Link
              href={`/marketing/campaigns/${item.id}`}
              className="absolute top-2 right-2 p-2 bg-white/80 text-gray-500 hover:text-blue-600 hover:bg-white rounded-full shadow-sm"
            >
              <Edit className="w-4 h-4" />
            </Link>
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
                onClick={() => column.sortable && handleSort(column.field, sortOrder === 'asc' ? 'desc' : 'asc')}
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
          {campaigns.map((item, index) => (
            <tr key={index}>
              <td className="w-10 px-4 py-4">
                <Link
                  href={`/marketing/campaigns/${item.id}`}
                  className="text-gray-500 hover:text-blue-600"
                >
                  <Edit className="w-4 h-4" />
                </Link>
              </td>
              {columns.filter(col => !col.hidden).map((column) => (
                <td key={column.field} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {column.format ? column.format(item[column.field as keyof MarketingCampaign]) : item[column.field as keyof MarketingCampaign]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );


  const handleViewChange = (newView: 'grid' | 'list') => {
    setView(newView);
  };


  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Marketing Campaigns</h1>
        <button onClick={handleAddCampaign} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Add New Campaign
        </button>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleViewChange('grid')}
                  className={`p-2 rounded ${
                    view === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className={`p-2 rounded ${
                    view === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
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
            </div>
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronLeft className="w-5 h-5 text-black font-bold" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                >
                  <ChevronRight className="w-5 h-5 text-black font-bold" />
                </button>
              </div>
            )}
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            view === 'grid' ? renderGridView() : renderListView()
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}