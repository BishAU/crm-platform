'use client';

import { useState, useEffect } from 'react';
import { parse } from 'csv-parse/sync';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { Upload, FileUp, AlertCircle } from 'lucide-react';

interface MappingSuggestion {
  field: string;
  similarity: number;
}

export default function ImportPage() {
  const [showImportUI, setShowImportUI] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [importResults, setImportResults] = useState<any>(null);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [tableList, setTableList] = useState<Array<{value: string, label: string, template: string}>>([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const [tableError, setTableError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoadingTables(true);
        setTableError(null);
        const res = await fetch('/api/schema');
        if (!res.ok) {
          throw new Error('Failed to fetch tables');
        }
        const data = await res.json();
        setTableList(data.tables || []);
      } catch (err) {
        console.error('Error fetching table list:', err);
        setTableError('Failed to load available tables');
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }
    setSelectedFile(file || null);
    setError(null);
  };

  const analyzeFile = async () => {
    if (!selectedFile || !selectedTable) {
      setError('Please select both a file and a table');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const csvData = e.target?.result as string;
          const response = await fetch('/api/import/analyze-csv', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tableName: selectedTable, csvData })
          });

          if (!response.ok) {
            throw new Error('Failed to analyze CSV file');
          }

          const data = await response.json();
          setImportResults(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to analyze CSV file');
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError('Failed to read file');
        setLoading(false);
      };

      reader.readAsText(selectedFile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Import Data</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {/* File Selection */}
            <div>
              <label className="block text-sm font-medium text-ocean-700 mb-2">
                CSV File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-ocean-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-ocean-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-ocean-600 hover:text-ocean-500">
                      <span>Upload a file</span>
                      <input
                        type="file"
                        className="sr-only"
                        accept=".csv"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">CSV files only</p>
                </div>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-ocean-600">
                  Selected: {selectedFile.name}
                </p>
              )}
            </div>

            {/* Table Selection */}
            <div>
              <label className="block text-sm font-medium text-ocean-700 mb-2">
                Target Table
              </label>
              <div className="space-y-2">
                {loadingTables ? (
                  <div className="mt-1 flex items-center text-sm text-ocean-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-ocean-600 mr-2" />
                    Loading tables...
                  </div>
                ) : tableError ? (
                  <div className="mt-1 text-sm text-red-600">
                    {tableError}
                  </div>
                ) : (
                  <>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-ocean-500 focus:border-ocean-500 sm:text-sm rounded-md"
                      value={selectedTable}
                      onChange={(e) => setSelectedTable(e.target.value)}
                      disabled={loadingTables}
                    >
                      <option value="">Select a table</option>
                      {tableList.map(table => (
                        <option key={table.value} value={table.value}>{table.label}</option>
                      ))}
                    </select>
                    {selectedTable && (
                      <a
                        href={tableList.find(t => t.value === selectedTable)?.template}
                        download
                        className="inline-flex items-center text-sm text-ocean-600 hover:text-ocean-500"
                      >
                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download template for {tableList.find(t => t.value === selectedTable)?.label}
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <div className="mt-2 text-sm text-red-700">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div>
              <button
                onClick={analyzeFile}
                disabled={loading || !selectedFile || !selectedTable}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileUp className="mr-2 h-4 w-4" />
                    Analyze CSV
                  </>
                )}
              </button>
            </div>

            {/* Results Display */}
            {importResults && (
              <div className="mt-6 space-y-4">
                <div className="rounded-md bg-ocean-50 p-4">
                  <h3 className="text-lg font-medium text-ocean-900 mb-4">Analysis Results</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-ocean-800 mb-2">Field Mapping</h4>
                      <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                CSV Header
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Map To Field
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Confidence
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {importResults.csvHeaders.map((header: string, index: number) => {
                              const suggestion = importResults.mappingSuggestions.find(
                                (s: any) => s.csvHeader === header
                              );
                              return (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {header}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <select
                                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-ocean-500 focus:border-ocean-500 sm:text-sm rounded-md"
                                      value={fieldMappings[header] || suggestion?.schemaField || ''}
                                      onChange={(e) => {
                                        setFieldMappings(prev => ({
                                          ...prev,
                                          [header]: e.target.value
                                        }));
                                      }}
                                    >
                                      <option value="">Do not import</option>
                                      {importResults.schemaFields.map((field: string) => (
                                        <option key={field} value={field}>
                                          {field}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {suggestion ? `${Math.round(suggestion.similarity * 100)}%` : '-'}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          setImportResults(null);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          try {
                            setImporting(true);
                            setError(null);
                            const response = await fetch('/api/import', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                tableName: selectedTable,
                                csvData: selectedFile ? await selectedFile.text() : '',
                                mappings: fieldMappings
                              })
                            });

                            if (!response.ok) {
                              throw new Error('Failed to import data');
                            }

                            const result = await response.json();
                            setImportResults(null);
                            setSelectedFile(null);
                            setFieldMappings({});
                            // Show success message
                            alert(`Successfully imported ${result.count} records`);
                          } catch (err) {
                            setError(err instanceof Error ? err.message : 'Failed to import data');
                          } finally {
                            setImporting(false);
                          }
                        }}
                        disabled={importing || !selectedFile}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {importing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Importing...
                          </>
                        ) : (
                          'Import Data'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}