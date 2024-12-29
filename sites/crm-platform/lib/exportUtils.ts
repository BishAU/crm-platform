interface Column {
  field: string;
  header: string;
}

export function downloadCSV(data: any[], columns: Column[], filename: string) {
  // Create CSV header
  const header = columns.map((col) => col.header).join(',');

  // Create CSV rows
  const rows = data.map((item) =>
    columns
      .map((col) => {
        const value = item[col.field];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(',')
  );

  // Combine header and rows
  const csv = [header, ...rows].join('\n');

  // Create and trigger download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export function downloadExcel(data: any[], columns: Column[], filename: string) {
  // This is a placeholder for Excel export functionality
  // You would typically use a library like xlsx or exceljs for proper Excel export
  // For now, we'll just use CSV as a fallback
  downloadCSV(data, columns, filename);
}
