'use client';

import { useState } from 'react';
import DataGrid from '../components/DataGrid';
import Image from 'next/image';

interface User {
  id: string;
  avatar: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

const sampleData: User[] = [
  {
    id: '1',
    avatar: '/avatars/avatar1.jpg',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2023-12-24T10:30:00',
  },
  {
    id: '2',
    avatar: '/avatars/avatar2.jpg',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'Inactive',
    lastLogin: '2023-12-23T15:45:00',
  },
  {
    id: '3',
    avatar: '/avatars/avatar3.jpg',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'Active',
    lastLogin: '2023-12-24T09:15:00',
  },
];

const columns = [
  {
    field: 'avatar',
    headerName: 'Avatar',
    isImage: true,
    renderCell: (value: string) => (
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image
          src={value}
          alt="User avatar"
          width={40}
          height={40}
          className="object-cover"
        />
      </div>
    ),
  },
  {
    field: 'name',
    headerName: 'Name',
    isPrimary: true,
  },
  {
    field: 'email',
    headerName: 'Email',
  },
  {
    field: 'role',
    headerName: 'Role',
  },
  {
    field: 'status',
    headerName: 'Status',
  },
  {
    field: 'lastLogin',
    headerName: 'Last Login',
  },
];

export default function ExamplePage() {
  const [loading, setLoading] = useState(false);

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saved record:', updatedRecord);
    } catch (error) {
      console.error('Error saving record:', error);
      throw error;
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ocean-900 mb-6">Users</h1>
      <DataGrid
        columns={columns}
        rows={sampleData}
        entityType="user"
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}