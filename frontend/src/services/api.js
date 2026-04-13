export const BASE_URL = import.meta?.env?.VITE_API_BASE_URL || "http://localhost:8000";
console.log("Current API Target:", BASE_URL);

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const message = errorBody?.detail || "Request failed";
    console.error("API error:", {
      path,
      status: response.status,
      statusText: response.statusText,
      message,
      errorBody,
    });
    throw new Error(message);
  }

  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};
