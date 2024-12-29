'use client';

import { useState, useEffect } from 'react';
import DataGrid from '../components/DataGrid';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('/api/customers');
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (updatedRecord: Record<string, any>) => {
    try {
      const response = await fetch(`/api/customers/${updatedRecord.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecord),
      });

      if (!response.ok) {
        throw new Error('Failed to update customer');
      }

      const updatedCustomer = await response.json() as Customer;

      // Update the local state
      setCustomers(prev =>
        prev.map(customer =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      isPrimary: true,
      renderCell: (value: any) => {
        return <a href={`/customers/${value.id}`} className="text-ocean-600 hover:text-ocean-800">{value.name}</a>
      }
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'phone',
      headerName: 'Phone',
    },
    {
      field: 'address',
      headerName: 'Address',
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      active: false
    },
    {
      field: 'updatedAt',
      headerName: 'Updated At',
      active: false
    },
    {
      field: 'id',
      headerName: 'ID',
      active: false
    },
  ];

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8">
      <DataGrid
        rows={customers}
        columns={columns}
        entityType="customer"
        onSave={handleSave}
        loading={loading}
      />
    </div>
  );
}
