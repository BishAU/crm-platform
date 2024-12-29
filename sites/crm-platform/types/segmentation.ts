export type FilterOperator =
  | 'equals'
  | 'contains'
  | 'startsWith'
  | 'endsWith'
  | 'greaterThan'
  | 'lessThan'
  | 'in'
  | 'notIn';

export type FilterConjunction = 'AND' | 'OR';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: any;
}

export interface Filter {
  conditions: FilterCondition[];
  conjunction: FilterConjunction;
}

export interface SegmentStats {
  totalRecipients: number;
  activeRecipients: number;
  bounced: number;
  unsubscribed: number;
}

export interface Recipient {
  email: string;
  firstName?: string;
  lastName?: string;
  [key: string]: any;
}

export interface ListSegmentWithStats {
  id: string;
  name: string;
  description?: string | null;
  filters: Filter;
  listId: string;
  createdAt: Date;
  updatedAt: Date;
  stats: SegmentStats;
  error?: string;
}

export interface MailingListWithStats {
  id: string;
  name: string;
  description?: string | null;
  type: 'static' | 'dynamic';
  filters?: Filter | null;
  airtableId?: string | null;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  recipientCount: number;
  segments: ListSegmentWithStats[];
  error?: string;
}

export interface FilterField {
  name: string;
  label: string;
  type: 'string' | 'number' | 'date' | 'boolean' | 'enum';
  options?: { label: string; value: any }[];
  description?: string;
}

export const AVAILABLE_FIELDS: FilterField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'string',
    description: 'Recipient\'s email address'
  },
  {
    name: 'firstName',
    label: 'First Name',
    type: 'string',
    description: 'Recipient\'s first name'
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'string',
    description: 'Recipient\'s last name'
  },
  {
    name: 'country',
    label: 'Country',
    type: 'enum',
    options: [
      { label: 'United States', value: 'US' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Canada', value: 'CA' },
      { label: 'Australia', value: 'AU' }
      // Add more countries as needed
    ],
    description: 'Recipient\'s country'
  },
  {
    name: 'lastActive',
    label: 'Last Active',
    type: 'date',
    description: 'Last activity date'
  },
  {
    name: 'subscriptionDate',
    label: 'Subscription Date',
    type: 'date',
    description: 'Date when the recipient subscribed'
  },
  {
    name: 'engagementScore',
    label: 'Engagement Score',
    type: 'number',
    description: 'Recipient\'s engagement score (0-100)'
  },
  {
    name: 'isSubscribed',
    label: 'Subscription Status',
    type: 'boolean',
    description: 'Whether the recipient is currently subscribed'
  }
];
