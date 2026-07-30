const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiErrorShape {
  message?: string;
}

const parseError = async (response: Response) => {
  const data = (await response.json().catch(() => ({}))) as ApiErrorShape;
  return data.message || "Something went wrong.";
};

export const apiRequest = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const headers = new Headers(options.headers);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(await parseError(response));
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};

export const setAuthToken = (token: string | null) => {
  if (typeof window === "undefined") {
    return;
  }
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
};
