export type Field = {
  label: string;
  field: string;
  type?: 'text' | 'number' | 'email' | 'tel' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: string[];
  step?: number;
};
