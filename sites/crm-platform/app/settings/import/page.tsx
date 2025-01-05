'use client';

import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@components/AuthenticatedLayout';

interface DryRunReport {
  errors: { message: string; error: string }[];
  summary: {
    created: number;
    updated: number;
    ignored: number;
    dataTypeMismatchCount: number;
  };
}

// Function to calculate string similarity (Levenshtein distance)
function stringSimilarity(s1: string, s2: string): number {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
    const matrix = [];
    for (let i = 0; i <= s2.length; i++) {
        matrix[i] = [i];
    }
    for (let j = 0; j <= s1.length; j++) {
        matrix[0][j] = j;
    }
    for (let i = 1; i <= s2.length; i++) {
        for (let j = 1; j <= s1.length; j++) {
            if (s2[i - 1] === s1[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j - 1] + 1
                );
            }
        }
    }
    return matrix[s2.length][s1.length];
}

export default function ImportPage() {
  const [selectedTable, setSelectedTable] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [tableFields, setTableFields] = useState<any[]>([]);
  const [fieldMappings, setFieldMappings] = useState<Record<string, string>>({});
    const [missingFields, setMissingFields] = useState<string[]>([]);
    const [importError, setImportError] = useState<string | null>(null);
  const [dryRunReport, setDryRunReport] = useState<DryRunReport | null>(null);
  const [importing, setImporting] = useState(false);

  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      let tableName = selectedValue;
      switch (selectedValue) {
          case 'Users':
              tableName = 'User';
              break;
          case 'Outfalls':
              tableName = 'Outfall';
              break;
          case 'Politicians':
              tableName = 'Politician';
              break;
          case 'Marketing Lists':
              tableName = 'MarketingList';
              break;
          case 'Facilities':
              tableName = 'Facility';
              break;
          case 'Indigenous Communities':
              tableName = 'IndigenousCommunity';
              break;
          case 'Land Councils':
              tableName = 'LandCouncil';
              break;
          case 'Water Authorities':
              tableName = 'WaterAuthority';
              break;
          case 'Campaigns':
              tableName = 'Campaign';
              break;
          default:
              tableName = selectedValue;
      }
    setSelectedTable(tableName);
    console.log('Selected table:', tableName);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCsvFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        const csvText = event.target?.result as string;
        const headers = csvText.trim().split('\n')[0].split(',');
        setCsvHeaders(headers);
      };
      reader.readAsText(file);
    }
  };

    useEffect(() => {
        if (selectedTable) {
            fetch(`/api/schema?table=${selectedTable}`)
                .then(response => response.json())
                .then(data => {
                    const fields = data.fields || [];
                    setTableFields(fields);

                    if (csvHeaders.length > 0) {
                        const initialMappings: Record<string, string> = {};
                        csvHeaders.forEach(header => {
                            let bestMatch = '';
                            let minDistance = Infinity;

                            fields.forEach((field: any) => {
                                const distance = stringSimilarity(header, field.name);
                                if (field.name.toLowerCase() === header.toLowerCase()) {
                                    bestMatch = field.name;
                                    minDistance = 0;
                                    return;
                                } else if (distance < minDistance) {
                                    minDistance = distance;
                                    bestMatch = field.name;
                                }
                            });
                            if (bestMatch) {
                                initialMappings[header] = bestMatch;
                            }
                        });
                        setFieldMappings(initialMappings);
                    }
                })
                .catch(error => console.error('Error fetching table schema:', error));
        } else {
            setTableFields([]);
        }
    }, [selectedTable, csvHeaders]);


    useEffect(() => {
        if (csvHeaders.length > 0 && tableFields.length > 0) {
            const missing = csvHeaders.filter(header => {
                return !tableFields.some(field => {
                    if (typeof field === 'string') {
                        return field.toLowerCase() === header.toLowerCase();
                    } else if (field && field.name) {
                        return field.name.toLowerCase() === header.toLowerCase();
                    }
                    return false;
                });
            });
            setMissingFields(missing);
        } else {
            setMissingFields([]);
        }
    }, [csvHeaders, tableFields]);

    const handleMappingChange = (field: string, header: string) => {
        setFieldMappings(prev => ({
            ...prev,
            [header]: field,
        }));
        setMissingFields(prev => prev.filter(missingField => missingField !== header));
    };

    const handleCreateNewField = (newField: string) => {
        setFieldMappings(prev => ({
            ...prev,
            [newField]: newField,
        }));
        setMissingFields(prev => prev.filter(field => field !== newField));
    };

  const handleDryRun = async () => {
    if (!csvFile || !selectedTable) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvText = event.target?.result as string;
      try {
        const response = await fetch('/api/import/dry-run', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tableName: selectedTable,
            csvData: csvText,
            fieldMappings,
          }),
        });

        const data = await response.json();
        setDryRunReport(data.report);
      } catch (error) {
        console.error('Error during dry run:', error);
      }
    };
    reader.readAsText(csvFile);
  };

  const handleProcessNow = async () => {
      if (!csvFile || !selectedTable) {
          return;
      }

      setImporting(true);
      setImportError(null); // Clear any previous error
      const reader = new FileReader();
      reader.onload = async (event) => {
          const csvText = event.target?.result as string;
          try {
              console.log('Sending table name to backend:', selectedTable);
              const response = await fetch('/api/import/process', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                      tableName: selectedTable,
                      csvData: csvText,
                      fieldMappings,
                  }),
              });

              if (response.ok) {
                  alert('Import completed successfully!');
              } else {
                  const errorData = await response.json();
                  setImportError(errorData.message || 'Import failed.');
              }
          } catch (error) {
              console.error('Error during import:', error);
              setImportError('Import failed due to an unexpected error.');
          } finally {
              setImporting(false);
          }
      };
      reader.readAsText(csvFile);
  };

  return (
    <AuthenticatedLayout>
      <div className="p-8">
        <h1 className="text-2xl font-bold text-ocean-900 mb-6">Import Data</h1>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="table">Select Table</label>
          <select
            id="table"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={selectedTable}
            onChange={handleTableChange}
          >
            <option value="">Select a table</option>
            <option value="Users">Users</option>
            <option value="Outfalls">Outfalls</option>
            <option value="Politicians">Politicians</option>
            <option value="Marketing Lists">Marketing Lists</option>
            <option value="Facilities">Facilities</option>
            <option value="Indigenous Communities">Indigenous Communities</option>
            <option value="Land Councils">Land Councils</option>
            <option value="Water Authorities">Water Authorities</option>
            <option value="Campaigns">Campaigns</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="csv">Upload CSV File</label>
          <input
            id="csv"
            type="file"
            accept=".csv"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
        </div>
          {missingFields.length > 0 && (
              <div className="mb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Missing CSV Fields</h3>
                  <div className="grid grid-cols-2 gap-4">
                      {missingFields.map(field => (
                          <div key={field} className="flex items-center">
                              <label className="text-gray-700 text-sm font-bold mr-2">{field}</label>
                              <button
                                  className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded"
                                  onClick={() => handleCreateNewField(field)}
                              >
                                  Create New Field
                              </button>
                          </div>
                      ))}
                  </div>
              </div>
          )}
        {csvHeaders.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Map CSV Headers</h3>
            <div className="grid grid-cols-2 gap-4">
              {tableFields.map((field) => (
                <div key={typeof field === 'string' ? field : field.name} className="flex items-center">
                  <label className="text-gray-700 text-sm font-bold mr-2">{typeof field === 'string' ? field : field.name}</label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleMappingChange(typeof field === 'string' ? field : field.name, e.target.value)}
                  >
                    <option value="">Ignore</option>
                    {csvHeaders.map(header => (
                      <option key={header} value={header} selected={fieldMappings[header] === (typeof field === 'string' ? field : field.name)}>{header}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
          {importError && (
              <div className="mb-4 text-red-500">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Import Error</h3>
                  <p>{importError}</p>
              </div>
          )}
        {dryRunReport && (
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dry Run Report</h3>
            {dryRunReport.errors.length > 0 && (
              <div className="text-red-500">
                <h4>Errors:</h4>
                <ul>
                  {dryRunReport.errors.map((error, index) => (
                    <li key={index}>{error.message}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="text-green-500">
              <h4>Summary:</h4>
              <p>Created: {dryRunReport.summary.created}</p>
              <p>Updated: {dryRunReport.summary.updated}</p>
              <p>Ignored: {dryRunReport.summary.ignored}</p>
                <p>Data Type Mismatches: {dryRunReport.summary.dataTypeMismatchCount}</p>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <button
            className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={handleDryRun}
          >
            Dry Run
          </button>
          <button
            className="bg-ocean-500 hover:bg-ocean-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleProcessNow}
            disabled={!csvFile || importing}
          >
            Process Now
          </button>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}