'use client';

import { useState, useEffect } from 'react';
import DataGrid from '@components/DataGrid';
import AuthenticatedLayout from '@components/AuthenticatedLayout';
import { getFieldOrder } from '@lib/field-visibility-client';

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

  const defaultColumns = [
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

  // Get the ordered field names from localStorage or use default order
  const orderedFields = getFieldOrder('customer', defaultColumns.map(col => col.field));

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
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Customers</h1>
        <DataGrid
          rows={customers}
          columns={columns}
          entityType="customer"
          onSave={handleSave}
          loading={loading}
        />
      </div>
    </AuthenticatedLayout>
  );
}
