interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private baseUrl = '/api';

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'An error occurred');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      console.error('API Error:', error);
      return { error: error instanceof Error ? error.message : 'An error occurred' };
    }
  }

  // Direct HTTP methods
  async get<T>(endpoint: string, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any, config?: RequestInit): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Generic CRUD operations
  async getAll<T>(entity: string, params?: Record<string, string>): Promise<ApiResponse<T[]>> {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    return this.request<T[]>(`/${entity}${queryString}`);
  }

  async getById<T>(entity: string, id: string | number): Promise<ApiResponse<T>> {
    return this.request<T>(`/${entity}/${id}`);
  }

  async create<T>(entity: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(`/${entity}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async update<T>(
    entity: string,
    id: string | number,
    data: any
  ): Promise<ApiResponse<T>> {
    return this.request<T>(`/${entity}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(entity: string, id: string | number): Promise<ApiResponse<void>> {
    return this.request<void>(`/${entity}/${id}`, {
      method: 'DELETE',
    });
  }

  // Search and filter
  async search<T>(
    entity: string,
    query: string,
    filters?: Record<string, any>
  ): Promise<ApiResponse<T[]>> {
    const params = new URLSearchParams({ q: query });
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, String(value));
      });
    }
    return this.request<T[]>(`/${entity}/search?${params}`);
  }
}

export const api = new ApiService();
