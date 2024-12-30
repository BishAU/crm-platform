'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';

interface GridAction {
  label: string;
  action: (userId: string) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSave = async (updatedUser: Record<string, any>) => {
    try {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Refresh the user list
      const refreshResponse = await fetch('/api/users');
      const refreshData = await refreshResponse.json();
      setUsers(refreshData.data || []);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  const handlePasswordChange = async (userId: string, newPassword: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  };

  const defaultColumns = [
    { field: 'name', headerName: 'Name', isPrimary: true },
    { field: 'email', headerName: 'Email' },
    { field: 'active', headerName: 'Active', type: 'boolean' },
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

  if (loading) {
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
        <DataGrid
          rows={users}
          columns={columns}
          entityType="user"
          onSave={handleSave}
          loading={loading}
          additionalActions={[
            {
              label: 'Change Password',
              action: (userId) => {
                const newPassword = prompt('Enter new password:');
                if (newPassword) {
                  handlePasswordChange(userId, newPassword);
                }
              }
            }
          ]}
        />
      </div>
    </AuthenticatedLayout>
  );
}