
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const fetchAPI = async (
  endpoint: string,
  method: HTTPMethod,
  body?: object,
  headers: Record<string, string> = {}
) => {
    const url = `${baseURL}${endpoint}`;
  
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: 'no-store',
      credentials: 'include',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }
  
    return response.json();
  };