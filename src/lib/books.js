const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getBooks = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/books${query ? `?${query}` : ""}`);
  if (!res.ok) {
    throw new Error("Could not load books");
  }
  return res.json();
};
