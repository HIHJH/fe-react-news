const BASE_URL = "https://news-worker.forhyundaisofteer.workers.dev";

type RequestOptions = RequestInit;

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const fullUrl = url.startsWith("http") ? url : `${BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  if (!response.ok) {
    // Attempt to parse error message from body if available
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || errorData.error || `HTTP Error: ${response.status}`);
    } catch (e) {
      if (e instanceof Error && e.message.startsWith("HTTP Error")) throw e;
      throw new Error(`HTTP Error: ${response.status}`);
    }
  }

  // Handle 204 No Content or empty responses
  if (response.status === 204) {
    return {} as unknown as T;
  }

  const text = await response.text();
  try {
    return text ? JSON.parse(text) : ({} as unknown as T);
  } catch {
    throw new Error("Failed to parse JSON response");
  }
}

export const httpClient = {
  get: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "GET" }),
  post: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),
  delete: <T>(url: string, options?: RequestOptions) =>
    request<T>(url, { ...options, method: "DELETE" }),
  put: <T>(url: string, body?: unknown, options?: RequestOptions) =>
    request<T>(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),
};
