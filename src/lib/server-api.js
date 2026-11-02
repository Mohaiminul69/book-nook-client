import { cache } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getTokenFromServer = async () => {
  const result = await auth.api.getToken({ headers: await headers() });
  return result?.token;
};

export const getSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

export const getMyBorrows = async () => {
  const token = await getTokenFromServer();
  const res = await fetch(`${API_URL}/borrows`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) {
    throw new Error("Could not load borrows");
  }
  return res.json();
};

export const getBookById = cache(async (id) => {
  const token = await getTokenFromServer();
  const res = await fetch(`${API_URL}/books/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    throw new Error("Could not load the book");
  }
  return res.json();
});
