import { cookies } from 'next/headers';

export interface FieldVisibility {
  [entityType: string]: {
    [fieldName: string]: boolean;
  };
}

const COOKIE_NAME = 'field-visibility';

export function getFieldVisibility(): FieldVisibility {
  const cookieStore = cookies();
  const visibilityCookie = cookieStore.get(COOKIE_NAME);
  
  if (!visibilityCookie) {
    return {};
  }

  try {
    return JSON.parse(visibilityCookie.value);
  } catch {
    return {};
  }
}

export function setFieldVisibility(entityType: string, fieldName: string, isVisible: boolean) {
  const cookieStore = cookies();
  const currentVisibility = getFieldVisibility();
  
  if (!currentVisibility[entityType]) {
    currentVisibility[entityType] = {};
  }
  
  currentVisibility[entityType][fieldName] = isVisible;
  
  // Set cookie with a long expiration (1 year)
  cookieStore.set(COOKIE_NAME, JSON.stringify(currentVisibility), {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    path: '/',
  });
}

export function getVisibleFields(entityType: string, allFields: string[]): string[] {
  const visibility = getFieldVisibility();
  const entityVisibility = visibility[entityType] || {};
  
  return allFields.filter(field => entityVisibility[field] !== false);
}
