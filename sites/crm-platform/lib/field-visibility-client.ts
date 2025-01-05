// Default field orders for different entity types
const defaultFieldOrders: Record<string, string[]> = {
  waterAuthority: ['name', 'indigenousCommunities', 'createdAt', 'updatedAt'],
  outfall: ['outfallName', 'authority', 'type', 'latitude', 'longitude', 'state', 'contact', 'contact_email', 'contact_name', 'indigenousNation', 'landCouncil', 'createdAt', 'updatedAt'],
  politician: ['name', 'email', 'party', 'position', 'state', 'createdAt', 'updatedAt'],
  indigenousCommunity: ['name', 'region', 'population', 'waterAuthorities', 'createdAt', 'updatedAt'],
  landCouncil: ['name', 'email', 'lgas', 'outfallCount', 'outfalls', 'phone', 'createdAt', 'updatedAt'],
  person: ['name', 'email', 'phone', 'organization', 'createdAt', 'updatedAt'],
  facility: ['name', 'type', 'sector', 'latitude', 'longitude', 'postcode', 'suburb', 'regionType', 'createdAt', 'updatedAt']
};

// Get the field order for a specific entity type
export function getFieldOrder(entityType: string, fields?: string[]): string[] {
  const defaultOrder = defaultFieldOrders[entityType] || [];
  
  if (!fields) {
    return defaultOrder;
  }

  // If fields are provided, order them according to default order if possible,
  // and append any fields that aren't in the default order
  const orderedFields = defaultOrder
    .filter(field => fields.includes(field));
  
  const remainingFields = fields
    .filter(field => !defaultOrder.includes(field));

  return [...orderedFields, ...remainingFields];
}

// Get visible fields for a specific entity type
export function getVisibleFields(entityType: string): string[] {
  // For now, return all fields in the default order
  // In the future, this could be customized per user/role
  return getFieldOrder(entityType);
}

// Check if a field should be visible
export function isFieldVisible(entityType: string, fieldName: string): boolean {
  const visibleFields = getVisibleFields(entityType);
  return visibleFields.includes(fieldName);
}

// Get display name for a field
export function getFieldDisplayName(fieldName: string): string {
  // Convert camelCase to Title Case with spaces
  return fieldName
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

// Get field type (for rendering purposes)
export function getFieldType(fieldName: string): string {
  if (fieldName.includes('date') || fieldName === 'createdAt' || fieldName === 'updatedAt') {
    return 'date';
  }
  if (fieldName.includes('email')) {
    return 'email';
  }
  if (fieldName.includes('phone')) {
    return 'phone';
  }
  if (fieldName.includes('latitude') || fieldName.includes('longitude')) {
    return 'coordinate';
  }
  return 'text';
}

// Format field value based on type
export function formatFieldValue(value: any, fieldName: string): string {
  if (value === null || value === undefined) {
    return '';
  }

  const type = getFieldType(fieldName);

  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'coordinate':
      return typeof value === 'number' ? value.toFixed(6) : value.toString();
    default:
      return value.toString();
  }
}