'use client';

import { useEntityData } from '../../../lib/hooks';
import AuthenticatedLayout from '../../components/AuthenticatedLayout';
import Link from 'next/link';
import { ChevronRight, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Outfall {
  id: string;
  outfallName: string;
  outfall: string;
  type: string;
  authority: string;
  state: string;
  latitude: string;
  longitude: string;
  indigenousNation: string;
  landCouncil: string;
  contact_name: string;
  contact_email: string;
  createdAt: string;
  updatedAt: string;
}

export default function OutfallPage() {
  const params = useParams();
  const { data: outfall, error } = useEntityData<Outfall>({
    endpoint: '/api/outfalls',
    errorMessage: 'Failed to fetch outfall'
  });

  const [isEditing, setIsEditing] = useState(true);
  const [editedData, setEditedData] = useState<Outfall>({
    id: '',
    outfallName: '',
    outfall: '',
    type: '',
    authority: '',
    state: '',
    latitude: '',
    longitude: '',
    indigenousNation: '',
    landCouncil: '',
    contact_name: '',
    contact_email: '',
    createdAt: '',
    updatedAt: ''
  });
  const [saveError, setSaveError] = useState<string | null>(null);

  // Update editedData when outfall data is loaded
  useEffect(() => {
    if (outfall) {
      console.log('Initializing form with data:', outfall);
      setEditedData({
        id: outfall.id || '',
        outfallName: outfall.outfallName || '',
        outfall: outfall.outfall || '',
        type: outfall.type || '',
        authority: outfall.authority || '',
        state: outfall.state || '',
        latitude: outfall.latitude || '',
        longitude: outfall.longitude || '',
        indigenousNation: outfall.indigenousNation || '',
        landCouncil: outfall.landCouncil || '',
        contact_name: outfall.contact_name || '',
        contact_email: outfall.contact_email || '',
        createdAt: outfall.createdAt || '',
        updatedAt: outfall.updatedAt || ''
      });
    }
  }, [outfall]);

  const handleChange = (field: keyof Outfall, value: string) => {
    if (editedData) {
      setEditedData({ ...editedData, [field]: value });
    }
  };

  const handleSave = async () => {
    if (!outfall) return;

    // Create update payload with non-empty values
    const updateData = {
      type: editedData.type || outfall.type,
      authority: editedData.authority || outfall.authority,
      state: editedData.state || outfall.state,
      latitude: editedData.latitude || outfall.latitude,
      longitude: editedData.longitude || outfall.longitude,
      indigenousNation: editedData.indigenousNation || outfall.indigenousNation,
      landCouncil: editedData.landCouncil || outfall.landCouncil,
      contact_name: editedData.contact_name || outfall.contact_name,
      contact_email: editedData.contact_email || outfall.contact_email
    };

    try {
      console.log('Saving data:', updateData);
      const response = await fetch(`/api/outfalls/${params?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to save changes');
      }

      // Refresh the data
      window.location.reload();
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save changes');
    }
  };

  const handleCancel = () => {
    if (outfall) {
      setEditedData(outfall);
    }
  };

  if (error) {
    return (
      <AuthenticatedLayout>
        <div className="p-8">
          <div className="flex items-center text-sm text-ocean-600 mb-4">
            <Link href="/dashboard" className="hover:text-ocean-700">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href="/outfalls" className="hover:text-ocean-700">Outfalls</Link>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error: {error}
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  if (!outfall || !editedData) {
    return (
      <AuthenticatedLayout>
        <div className="p-8">
          <div className="flex items-center text-sm text-ocean-600 mb-4">
            <Link href="/dashboard" className="hover:text-ocean-700">Dashboard</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <Link href="/outfalls" className="hover:text-ocean-700">Outfalls</Link>
          </div>
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <div className="flex items-center text-sm text-ocean-600 mb-4">
          <Link href="/dashboard" className="hover:text-ocean-700">Dashboard</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <Link href="/outfalls" className="hover:text-ocean-700">Outfalls</Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-ocean-900">{outfall.outfallName}</span>
        </div>

        <div className="mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-ocean-900">{outfall.outfallName}</h1>
            <p className="text-ocean-600">Outfall ID: {outfall.outfall}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="flex items-center px-3 py-2 text-sm bg-ocean-600 text-white rounded-lg hover:bg-ocean-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center px-3 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>

        {saveError && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {saveError}
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold text-ocean-900 mb-4">Basic Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Type</label>
                  <input
                    type="text"
                    value={editedData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Authority</label>
                  <input
                    type="text"
                    value={editedData.authority}
                    onChange={(e) => handleChange('authority', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">State</label>
                  <input
                    type="text"
                    value={editedData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-ocean-900 mb-4">Location</h2>
              <div className="space-y-3">
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Latitude</label>
                  <input
                    type="text"
                    value={editedData.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Longitude</label>
                  <input
                    type="text"
                    value={editedData.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Indigenous Nation</label>
                  <input
                    type="text"
                    value={editedData.indigenousNation}
                    onChange={(e) => handleChange('indigenousNation', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-ocean-700 mb-1">Land Council</label>
                  <input
                    type="text"
                    value={editedData.landCouncil}
                    onChange={(e) => handleChange('landCouncil', e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-ocean-900 mb-4">Contact Information</h2>
            <div className="space-y-3">
              <div>
                <label className="block font-medium text-ocean-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  value={editedData.contact_name}
                  onChange={(e) => handleChange('contact_name', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                />
              </div>
              <div>
                <label className="block font-medium text-ocean-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={editedData.contact_email}
                  onChange={(e) => handleChange('contact_email', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-500"
                />
              </div>
            </div>
          </div>

          <div className="text-sm text-ocean-500">
            <div>Created: {new Date(editedData.createdAt).toLocaleDateString()}</div>
            <div>Last Updated: {new Date(editedData.updatedAt).toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
