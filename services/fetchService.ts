export const fetchService = {
  get: async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    return response.json() as Promise<T>;
  },
  post: async <T>(url: string): Promise<T> => {
    const response = await fetch(url, { method: "POST" });
    return response.json() as Promise<T>;
  },
};
