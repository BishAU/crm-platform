'use client';

import { useState, useEffect } from 'react';
import DataGrid from '../../components/DataGrid';

interface MarketingList {
  id: string;
  name: string;
  filter: string;
  type: 'static' | 'dynamic';
  creator: string;
  createdAt: string;
  updatedAt: string;
}

import AuthenticatedLayout from '../../components/AuthenticatedLayout';

interface MarketingList {
  id: string;
  name: string;
  filter: string;
  type: 'static' | 'dynamic';
  creator: string;
  createdAt: string;
  updatedAt: string;
}

export default function MarketingListsPage() {
  const [lists, setLists] = useState<MarketingList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newList, setNewList] = useState({ name: '', description: '' });

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await fetch('/api/marketing/lists');
        if (!response.ok) {
          throw new Error('Failed to fetch marketing lists');
        }
        const data = await response.json();
        setLists(data);
      } catch (error) {
        console.error('Error fetching marketing lists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLists();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', isPrimary: true },
    { field: 'name', headerName: 'List Name' },
    { field: 'filter', headerName: 'Filter' },
    { field: 'type', headerName: 'Type' },
    { field: 'creator', headerName: 'Creator' },
    { field: 'createdAt', headerName: 'Created At' },
    { field: 'updatedAt', headerName: 'Updated At' },
  ];

  const handleCreateList = async () => {
    try {
      console.log('New list data:', newList);
      const response = await fetch('/api/marketing/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newList),
      });

      if (!response.ok) {
        throw new Error('Failed to create marketing list');
      }

      const createdList = await response.json();
      setLists([...lists, createdList]);
      setShowModal(false);
      setNewList({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating marketing list:', error);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-ocean-900">Marketing Lists</h1>
          <button
            className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(true)}
          >
            Create New List
          </button>
        </div>
        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Create New List</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">List Name</label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newList.name}
                  onChange={(e) => setNewList({ ...newList, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description (optional)</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newList.description}
                  onChange={(e) => setNewList({ ...newList, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleCreateList}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        )}
        <DataGrid
          rows={lists}
          columns={columns}
          entityType="marketingList"
          onSave={async (record) => {
            console.log('Save marketing list:', record);
          }}
          loading={loading}
        />
      </div>
    </AuthenticatedLayout>
  );
}