export type HttpMethods =
<<<<<<< HEAD
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
=======
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'
  | 'HEAD';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a

export const fetchAPI = async (
  endpoint: string,
  method: HttpMethods,
  body?: object,
  headers: Record<string, string> = {}
) => {
  const url = `${baseURL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
<<<<<<< HEAD
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
    credentials: "include",
  });

  if (!response) {
    throw new Error("Request failed", response);
  }

  return response.json();
};
=======
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: 'no-store',
    credentials: 'include'
  });

  if (!response) {
    throw new Error('Request failed', response);
  }

  return response.json();
};
>>>>>>> c232687c82f06e084bf2c56f89bf58be3210d49a
