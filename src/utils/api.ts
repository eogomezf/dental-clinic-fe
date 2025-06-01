type HTTPMethod =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "OPTIONS"
  | "HEAD";
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const fetchAPI = async (
  endpoint: string,
  method: HTTPMethod,
  body?: object
) => {
  const url = `${baseURL}${endpoint}`;

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
};
