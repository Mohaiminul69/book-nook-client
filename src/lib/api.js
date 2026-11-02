import { authClient } from "@/lib/auth-client";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTokenFromClient = async () => {
  const { data } = await authClient.token();
  return data?.token;
};

export const apiFetch = async (path, options = {}) => {
  const token = await getTokenFromClient();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const error = new Error(data?.message || "Something went wrong");
    error.status = res.status;
    error.code = data?.code;
    throw error;
  }
  return data;
};
