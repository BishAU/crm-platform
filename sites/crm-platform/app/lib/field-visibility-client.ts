/**
 * Get the stored field order for an entity type from localStorage
 * If no order is stored, returns the default order
 */
export function getFieldOrder(entityType: string, defaultOrder: string[]): string[] {
  if (typeof window === 'undefined') {
    return defaultOrder;
  }

  const key = `${entityType}_field_order`;
  const storedOrder = localStorage.getItem(key);
  
  if (!storedOrder) {
    return defaultOrder;
  }

  try {
    const parsedOrder = JSON.parse(storedOrder) as string[];
    
    // Ensure all default fields are included
    const missingFields = defaultOrder.filter(field => !parsedOrder.includes(field));
    return [...parsedOrder, ...missingFields];
  } catch (error) {
    console.error('Error parsing stored field order:', error);
    return defaultOrder;
  }
}

/**
 * Save the field order for an entity type to localStorage
 */
export function saveFieldOrder(entityType: string, order: string[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  const key = `${entityType}_field_order`;
  try {
    localStorage.setItem(key, JSON.stringify(order));
  } catch (error) {
    console.error('Error saving field order:', error);
  }
}

/**
 * Reset the field order for an entity type back to default
 */
export function resetFieldOrder(entityType: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const key = `${entityType}_field_order`;
  localStorage.removeItem(key);
}

/**
 * Get the visibility state of fields for an entity type
 */
export function getFieldVisibility(entityType: string): Record<string, boolean> {
  if (typeof window === 'undefined') {
    return {};
  }

  const key = `${entityType}_field_visibility`;
  const stored = localStorage.getItem(key);
  
  if (!stored) {
    return {};
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error parsing stored field visibility:', error);
    return {};
  }
}

/**
 * Save the visibility state of fields for an entity type
 */
export function saveFieldVisibility(entityType: string, visibility: Record<string, boolean>): void {
  if (typeof window === 'undefined') {
    return;
  }

  const key = `${entityType}_field_visibility`;
  try {
    localStorage.setItem(key, JSON.stringify(visibility));
  } catch (error) {
    console.error('Error saving field visibility:', error);
  }
}

/**
 * Reset the visibility state of fields for an entity type
 */
export function resetFieldVisibility(entityType: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const key = `${entityType}_field_visibility`;
  localStorage.removeItem(key);
}
