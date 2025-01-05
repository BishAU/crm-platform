'use client';

import { useState, useEffect } from 'react';
import { parse } from 'csv-parse/sync';
import AuthenticatedLayout from '../components/AuthenticatedLayout';
import { Upload, FileUp, AlertCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

interface MappingSuggestion {
  csvHeader: string;
  schemaField: string;
  similarity: number;
  fieldType: string;
  optional: boolean;
  isList: boolean;
}

interface ImportError {
  message: string;
  details?: string;
  importedCount?: number;
}

interface TableInfo {
  value: string;
  label: string;
  template: string;
}

interface SchemaField {
  name: string;
  type: string;
  optional: boolean;
  list: boolean;
}

interface AnalysisResult {
  csvHeaders: string[];
  schemaFields: SchemaField[];
  mappingSuggestions: MappingSuggestion[];
  recordCount: number;
  warnings?: string[];
  tableName: string;
  sampleData: Record<string, any>[];
}

interface ImportSuccess {
  message: string;
  importedCount: number;
  totalRecords: number;
  validRecords: number;
  invalidRecords: number;
}

export default function ImportPage() {
  const [showImportUI, setShowImportUI] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTable, setSelectedTable] = useState('');
  const [importResults, setImportResults] = useState<AnalysisResult | null>(null);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
  const [importing, setImporting] = useState(false);
  const [tableList, setTableList] = useState<TableInfo[]>([]);
  const [loadingTables, setLoadingTables] = useState(true);
  const [tableError, setTableError] = useState<string | null>(null);
  const [error, setError] = useState<ImportError | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [success, setSuccess] = useState<ImportSuccess | null>(null);

  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoadingTables(true);
        setTableError(null);
        const res = await fetch('/api/schema');
        
        if (!res.ok) {
          const error = await res.json();
          throw new Error(error.details || 'Failed to fetch tables');
        }
        
        const data = await res.json();
        
        if (!data.tables || data.tables.length === 0) {
          throw new Error('No tables available for import');
        }
        
        setTableList(data.tables);
      } catch (err) {
        console.error('Error fetching table list:', err);
        setTableError(err instanceof Error ? err.message : 'Failed to load available tables');
      } finally {
        setLoadingTables(false);
      }
    };

    fetchTables();
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && !file.name.toLowerCase().endsWith('.csv')) {
      setError({ message: 'Please select a CSV file' });
      return;
    }
    setSelectedFile(file || null);
    setError(null);
    setImportResults(null);
    setFieldMappings({});
    setSuccess(null);

    // Automatically analyze if both file and table are selected
    if (file && selectedTable) {
      await analyzeFile(file, selectedTable);
    }
  };

  const handleTableChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const table = e.target.value;
    setSelectedTable(table);
    setImportResults(null);
    setFieldMappings({});
    setSuccess(null);

    // Automatically analyze if file is already selected
    if (selectedFile && table) {
      await analyzeFile(selectedFile, table);
    }
  };

  const analyzeFile = async (file: File, table: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const csvData = await file.text();
      const response = await fetch('/api/import/analyze-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ tableName: table.toLowerCase(), csvData })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze CSV file');
      }

      const data = await response.json();
      setImportResults(data);

      // Set initial mappings based on high-confidence suggestions
      const initialMappings: Record<string, string> = {};
      data.mappingSuggestions.forEach((suggestion: MappingSuggestion) => {
        if (suggestion.similarity > 0.8) {
          initialMappings[suggestion.csvHeader] = suggestion.schemaField;
        }
      });
      setFieldMappings(initialMappings);
    } catch (err) {
      setError({ 
        message: err instanceof Error ? err.message : 'Failed to analyze CSV file',
        details: err instanceof Error ? err.stack : undefined
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      setImporting(true);
      setError(null);
      setSuccess(null);

      // Log the request data for debugging
      console.log('Import request:', {
        tableName: selectedTable,
        mappings: fieldMappings,
        recordCount: selectedFile ? 'File selected' : 'No file'
      });

      const response = await fetch('/api/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tableName: selectedTable.toLowerCase(),
          csvData: selectedFile ? await selectedFile.text() : '',
          mappings: fieldMappings
        })
      });

      const result = await response.json();

      if (response.status === 207) {
        // Partial success
        setError({
          message: 'Some records failed to import',
          details: result.details,
          importedCount: result.importedCount
        });
      } else if (!response.ok || result.error) {
        // Complete failure
        throw new Error(result.error || result.details || 'Failed to import data');
      } else {
        // Complete success
        setSuccess({
          message: 'Import completed successfully',
          importedCount: result.importedCount,
          totalRecords: result.totalRecords,
          validRecords: result.validRecords,
          invalidRecords: result.invalidRecords
        });
        setImportResults(null);
        setSelectedFile(null);
        setFieldMappings({});
        setShowConfirmation(false);
      }
    } catch (err) {
      console.error('Import error:', err);
      const errorResponse = err instanceof Error ? err : new Error('Failed to import data');
      setError({ 
        message: errorResponse.message,
        details: err instanceof Error ? err.stack : undefined
      });
    } finally {
      setImporting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Import Data</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            {/* Success Message */}
            {success && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      {success.message}
                    </h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>Successfully imported {success.importedCount} records.</p>
                      {success.invalidRecords > 0 && (
                        <p className="mt-1">
                          {success.invalidRecords} records were skipped due to validation errors.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                    Loading available tables...
                  </div>
                ) : tableError ? (
                  <div className="mt-1 text-sm text-red-600 flex items-center">
                    <XCircle className="h-4 w-4 mr-2" />
                    {tableError}
                  </div>
                ) : (
                  <>
                    <select
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-ocean-500 focus:border-ocean-500 sm:text-sm rounded-md text-gray-900"
                      value={selectedTable}
                      onChange={handleTableChange}
                      disabled={loadingTables}
                    >
                      <option value="" className="text-gray-900">Select a table</option>
                      {tableList.map(table => (
                        <option key={table.value} value={table.value} className="text-gray-900">
                          {table.label}
                        </option>
                      ))}
                    </select>
                    {selectedTable && tableList.length > 0 && (
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
              <div className={`rounded-md ${error.importedCount !== undefined ? 'bg-yellow-50' : 'bg-red-50'} p-4`}>
                <div className="flex">
                  {error.importedCount !== undefined ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${error.importedCount !== undefined ? 'text-yellow-800' : 'text-red-800'}`}>
                      {error.importedCount !== undefined ? 'Partial Import Success' : 'Error'}
                    </h3>
                    <div className={`mt-2 text-sm ${error.importedCount !== undefined ? 'text-yellow-700' : 'text-red-700'}`}>
                      <p className="font-medium">{error.message}</p>
                      {error.importedCount !== undefined && (
                        <p className="mt-1">Successfully imported {error.importedCount} records</p>
                      )}
                      {error.details && (
                        <pre className={`mt-2 text-xs ${error.importedCount !== undefined ? 'bg-yellow-100' : 'bg-red-100'} p-2 rounded overflow-x-auto whitespace-pre-wrap`}>
                          {error.details}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div>
              <button
                onClick={() => analyzeFile(selectedFile!, selectedTable)}
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

            {/* Analysis Results */}
            {importResults && (
              <div className="mt-6 space-y-6">
                {/* Schema Information */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-ocean-900 mb-4">Available Fields</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {importResults.schemaFields.map((field, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className="font-medium text-gray-900">{field.name}</span>
                          {!field.optional && <span className="ml-1 text-red-500">*</span>}
                        </div>
                        <div className="text-sm text-gray-500">
                          {field.type}{field.list ? '[]' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field Mapping */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-ocean-900 mb-4">Field Mapping</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            CSV Header
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Map To Field
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Field Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Required
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Match Confidence
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {importResults.csvHeaders.map((header, index) => {
                          const suggestion = importResults.mappingSuggestions.find(s => s.csvHeader === header);
                          return (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {header}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <select
                                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-ocean-500 focus:border-ocean-500 sm:text-sm rounded-md text-gray-900"
                                  value={fieldMappings[header] || suggestion?.schemaField || ''}
                                  onChange={(e) => {
                                    setFieldMappings(prev => ({
                                      ...prev,
                                      [header]: e.target.value
                                    }));
                                  }}
                                >
                                  <option value="" className="text-gray-900">Do not import</option>
                                  {importResults.schemaFields.map(field => (
                                    <option key={field.name} value={field.name} className="text-gray-900">
                                      {field.name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {suggestion?.fieldType || '-'}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {suggestion?.optional ? (
                                  <span className="text-gray-500">Optional</span>
                                ) : (
                                  <span className="text-red-500">Required</span>
                                )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                      className="bg-ocean-600 rounded-full h-2"
                                      style={{ width: `${Math.round((suggestion?.similarity || 0) * 100)}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    {suggestion ? `${Math.round(suggestion.similarity * 100)}%` : '-'}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sample Data Preview */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-ocean-900 mb-4">Sample Data Preview</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {importResults.csvHeaders.map((header, index) => (
                            <th
                              key={index}
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {importResults.sampleData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {importResults.csvHeaders.map((header, colIndex) => (
                              <td key={colIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Showing first {importResults.sampleData.length} rows of {importResults.recordCount} records
                  </p>
                </div>

                {/* Import Actions */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setImportResults(null);
                      setFieldMappings({});
                      setSuccess(null);
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfirmation(true)}
                    disabled={importing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-ocean-600 hover:bg-ocean-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Import Data
                  </button>
                </div>
              </div>
            )}

            {/* Import Confirmation Modal */}
            {showConfirmation && importResults && (
              <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
                  <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-ocean-100">
                        <Info className="h-6 w-6 text-ocean-600" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">
                          Confirm Import
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            You are about to import {importResults.recordCount} records into the {importResults.tableName} table.
                            {importResults.warnings && importResults.warnings.length > 0 && (
                              <span className="block mt-2 text-yellow-600">
                                Warning: {importResults.warnings.join(' ')}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                      <button
                        type="button"
                        onClick={handleImport}
                        disabled={importing}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-ocean-600 text-base font-medium text-white hover:bg-ocean-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500 sm:col-start-2 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {importing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                            Importing...
                          </>
                        ) : (
                          'Proceed with Import'
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowConfirmation(false)}
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      >
                        Cancel
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