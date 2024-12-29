export interface FieldVisibility {
  [entityType: string]: {
    [fieldName: string]: boolean;
  };
}

const STORAGE_KEY = 'field-visibility';

export function getFieldVisibility(): FieldVisibility {
  if (typeof window === 'undefined') {
    return {};
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {};
  }

  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function setFieldVisibility(entityType: string, fieldName: string, isVisible: boolean) {
  const currentVisibility = getFieldVisibility();
  
  if (!currentVisibility[entityType]) {
    currentVisibility[entityType] = {};
  }
  
  currentVisibility[entityType][fieldName] = isVisible;
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentVisibility));
  }
}

export function getVisibleFields(entityType: string, allFields: string[]): string[] {
  const visibility = getFieldVisibility();
  const entityVisibility = visibility[entityType] || {};
  
  // Initialize fields as visible if they haven't been set yet
  if (Object.keys(entityVisibility).length === 0) {
    const initialVisibility = allFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);

    if (typeof window !== 'undefined') {
      const currentVisibility = getFieldVisibility();
      currentVisibility[entityType] = initialVisibility;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentVisibility));
    }

    return allFields;
  }

  // Only return fields that are explicitly set to true
  return allFields.filter(field => entityVisibility[field] === true);
}
