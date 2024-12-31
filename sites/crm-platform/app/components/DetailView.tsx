'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, EyeIcon, EyeSlashIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { getFieldVisibility, saveFieldVisibility, getFieldOrder, saveFieldOrder } from '../lib/field-visibility-client';

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
    const visibility = getFieldVisibility(entityType);
    return visibility || {};
  });

  const [orderedFields, setOrderedFields] = useState<string[]>(() => {
    const defaultFields = Object.keys(record);
    const savedOrder = getFieldOrder(entityType, defaultFields);
    
    // Add any new fields to the end of the order
    const newFields = defaultFields.filter(field => !savedOrder.includes(field));
    return [...savedOrder, ...newFields];
  });

  useEffect(() => {
    setEditedRecord(record);

    // Initialize visibility for any new fields
    const defaultFields = Object.keys(record);
    const currentVisibility = getFieldVisibility(entityType) || {};
    const newFields = defaultFields.filter(field => currentVisibility[field] === undefined);
    if (newFields.length > 0) {
      newFields.forEach(field => {
        saveFieldVisibility(entityType, { ...currentVisibility, [field]: true });
      });
      setLocalFieldVisibility(prev => ({
        ...prev,
        ...newFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
      }));
    }
  }, [record, entityType]);

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
    saveFieldVisibility(entityType, { ...fieldVisibility, [field]: newVisibility });
    setLocalFieldVisibility(prev => ({
      ...prev,
      [field]: newVisibility
    }));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(orderedFields);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setOrderedFields(items);
    saveFieldOrder(entityType, items);
  };

  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow-xl w-full overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-ocean-100 flex items-center bg-ocean-50">
        <button
          onClick={() => router.back()}
          className="mr-2 p-2 rounded-md hover:bg-ocean-100 transition-colors"
          title="Go back"
        >
          <ArrowLeftIcon className="w-5 h-5 text-ocean-600" />
        </button>
        <h2 className="text-xl font-semibold text-ocean-900">Edit Record</h2>
      </div>

      {/* Content */}
      <div className="p-6 overflow-y-auto">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="fields">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {orderedFields.map((field, index) => (
                  <Draggable key={field} draggableId={field} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`transition-opacity ${fieldVisibility[field] !== false ? 'opacity-100' : 'opacity-50'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center">
                            <div
                              {...provided.dragHandleProps}
                              className="mr-2 p-1 rounded-md hover:bg-gray-100 cursor-move"
                            >
                              <ArrowsUpDownIcon className="w-4 h-4 text-gray-400" />
                            </div>
                            <label className="block text-sm font-medium text-ocean-700">
                              {field}
                            </label>
                            <button
                              onClick={() => toggleFieldVisibility(field)}
                              className={`p-1 rounded-md transition-colors ${
                                fieldVisibility[field] !== false
                                  ? 'text-ocean-600 hover:bg-ocean-50'
                                  : 'text-gray-400 hover:bg-gray-50'
                              }`}
                              title={fieldVisibility[field] !== false ? 'Deactivate field' : 'Activate field'}
                            >
                              {fieldVisibility[field] !== false ? (
                                <EyeIcon className="w-5 h-5" />
                              ) : (
                                <EyeSlashIcon className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        {typeof editedRecord[field] === 'boolean' ? (
                          <input
                            type="checkbox"
                            checked={editedRecord[field] || false}
                            onChange={(e) => handleFieldChange(field, e.target.checked)}
                            disabled={fieldVisibility[field] === false}
                            className="mt-1"
                          />
                        ) : (
                          <input
                            type="text"
                            value={editedRecord[field] || ''}
                            onChange={(e) => handleFieldChange(field, e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                              fieldVisibility[field] !== false
                                ? 'border-ocean-200 focus:ring-ocean-500 focus:border-ocean-500'
                                : 'border-gray-200 focus:ring-gray-500 focus:border-gray-500'
                            }`}
                            disabled={fieldVisibility[field] === false}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

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
  );
}
