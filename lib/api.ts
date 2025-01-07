import { NextResponse } from 'next/server';

export const ERROR_MESSAGES = {
  NOT_FOUND: (resource: string) => `${resource} not found`,
  UNAUTHORIZED: 'Unauthorized',
  INTERNAL_ERROR: 'Internal server error',
  INVALID_REQUEST: 'Invalid request'
};

/**
 * Common response helpers
 */
export const jsonResponse = (data: any, status = 200) => {
  return NextResponse.json(data, { status });
};

export const errorResponse = (message: string, status = 500) => {
  return NextResponse.json({ error: message }, { status });
};

export async function fetchData(endpoint: string, params?: Record<string, string>) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://crm.myinvoices.today';
  const url = new URL(endpoint, baseUrl);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include cookies for auth
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Error fetching data from ${endpoint}:`, message);
      throw new Error(`HTTP error! status: ${response.status}, message: ${message}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw new Error(`Failed to fetch data from ${endpoint}: ${error.message}`);
  }
}

// Type-safe API response handler
export async function handleApiResponse<T>(
  promise: Promise<Response>
): Promise<T> {
  try {
    const response = await promise;
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  } catch (error: any) {
    console.error('API Error:', error);
    throw error;
  }
}
