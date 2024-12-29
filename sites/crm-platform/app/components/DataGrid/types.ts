export interface Column {
  field: string;
  headerName: string;
  isPrimary?: boolean;
  isImage?: boolean;
  renderCell?: (value: any) => React.ReactNode;
  active?: boolean;
}

export interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface GridAction {
  label: string;
  action: (id: string) => void;
}

export interface DataGridProps {
  entityType: string;
  columns: Column[];
  rows: any[];
  onSave?: (record: Record<string, any>) => Promise<void>;
  loading?: boolean;
  pagination?: PaginationProps;
  onPageChange?: (page: number) => void;
  onSearch?: (term: string) => void;
  onSort?: (field: string, order: 'asc' | 'desc') => void;
  additionalActions?: GridAction[];
}

export interface GalleryViewProps {
  items: any[];
  columns: Column[];
  onItemClick: (item: any) => void;
  entityType: string;
}
