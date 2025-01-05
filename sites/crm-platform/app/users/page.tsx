'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';

interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      setShowModal(false);
      setNewUser({ username: '', email: '', password: '' });
      // Refresh the current page
      fetchUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const fetchUsers = async (params: {
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

      const response = await fetch(`/api/users?${queryParams}`);
      const data = await response.json();
      setUsers(data.data || []);
      setPagination(prev => ({
        ...prev,
        ...data.pagination
      }));
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers({
      page: pagination.page,
      limit: pagination.limit,
      search: searchTerm,
      sortBy,
      sortOrder
    });
  }, [pagination.page, pagination.limit, searchTerm, sortBy, sortOrder]);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/users/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Refresh the current page
      fetchUsers({
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        sortBy,
        sortOrder
      });
    } catch (error) {
      console.error('Error updating user:', error);
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

  const defaultColumns = [
    { field: 'username', headerName: 'Username', isPrimary: true },
    { field: 'email', headerName: 'Email' },
    { field: 'role', headerName: 'Role' },
    { field: 'createdAt', headerName: 'Created At', active: false },
    { field: 'updatedAt', headerName: 'Updated At', active: false },
    { field: 'id', headerName: 'ID', active: false },
  ];

  // Get the ordered field names from localStorage or use default order
  const orderedFields = getFieldOrder('user', defaultColumns.map(col => col.field));

  // Reorder columns based on the saved field order
  const columns = orderedFields
    .map(field => defaultColumns.find(col => col.field === field))
    .filter((col): col is typeof defaultColumns[0] => col !== undefined);

  if (loading && !users.length) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-600"></div>
      </div>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">User Management</h1>
        <button
          className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={() => setShowModal(true)}
        >
          Add New User
        </button>
        {showModal && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 text-center">
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setShowModal(false)}></div>
              <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                <div>
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Add New User</h3>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={newUser.username} onChange={(e) => setNewUser({...newUser, username: e.target.value})} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
                  </div>
                  <div className="flex justify-end">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => setShowModal(false)}>Cancel</button>
                    <button className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Add User</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <DataGrid
          rows={users}
          columns={columns}
          entityType="user"
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