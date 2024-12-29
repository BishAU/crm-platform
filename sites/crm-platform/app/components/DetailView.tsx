'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { getVisibleFields, getFieldVisibility, setFieldVisibility } from '../lib/field-visibility-client';

interface DetailViewProps {
  entityType: string;
  record: Record<string, any>;
  onSave?: (record: Record<string, any>) => Promise<void>;
}

export default function DetailView({ entityType, record, onSave }: DetailViewProps) {
  const [editedRecord, setEditedRecord] = useState<Record<string, any>>(record);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldVisibility, setLocalFieldVisibility] = useState(() => {
    const visibility = getFieldVisibility();
    return visibility[entityType] || {};
  });

  useEffect(() => {
    setEditedRecord(record);
  }, [record]);

  const handleFieldChange = (field: string, value: any) => {
    setEditedRecord((prev: Record<string, any>) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setLoading(true);
    setError(null);
    
    try {
      await onSave(editedRecord);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes');
    } finally {
      setLoading(false);
    }
  };

  const toggleFieldVisibility = (field: string) => {
    const newVisibility = !fieldVisibility[field];
    setFieldVisibility(entityType, field, newVisibility);
    setLocalFieldVisibility(prev => ({
      ...prev,
      [field]: newVisibility
    }));
  };

  const allFields = Object.keys(record);

  return (
    <div className="flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-ocean-100 flex items-center justify-between bg-ocean-50">
          <h2 className="text-xl font-semibold text-ocean-900">Edit Record</h2>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <div className="space-y-4">
            {allFields.map(field => {
              const isVisible = fieldVisibility[field] !== false;
              return (
                <div key={field} className={`transition-opacity ${isVisible ? 'opacity-100' : 'opacity-50'}`}>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-ocean-700">
                      {field}
                    </label>
                    <button
                      onClick={() => toggleFieldVisibility(field)}
                      className={`p-1 rounded-md transition-colors ${
                        isVisible 
                          ? 'text-ocean-600 hover:bg-ocean-50' 
                          : 'text-gray-400 hover:bg-gray-50'
                      }`}
                      title={isVisible ? 'Deactivate field' : 'Activate field'}
                    >
                      {isVisible ? (
                        <EyeIcon className="w-5 h-5" />
                      ) : (
                        <EyeSlashIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {typeof editedRecord[field] === 'boolean' ? (
                    <button
                      onClick={() => handleFieldChange(field, !editedRecord[field])}
                      className={`w-10 h-6 rounded-full p-1 transition-colors ${
                        editedRecord[field]
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          editedRecord[field]
                            ? 'translate-x-4'
                            : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : (
                    <input
                      type="text"
                      value={editedRecord[field] || ''}
                      onChange={(e) => handleFieldChange(field, e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                        isVisible
                          ? 'border-ocean-200 focus:ring-ocean-500 focus:border-ocean-500'
                          : 'border-gray-200 focus:ring-gray-500 focus:border-gray-500'
                      }`}
                      disabled={!isVisible}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-ocean-100 bg-ocean-50 flex justify-end space-x-3">
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-4 py-2 bg-ocean-600 text-white rounded-md transition-colors ${
              loading
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-ocean-700'
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
