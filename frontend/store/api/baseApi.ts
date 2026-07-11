import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * RTK Query temel API (rehber bölüm 2.5.2). Axios KULLANILMAZ — fetchBaseQuery.
 * JWT token authSlice'tan prepareHeaders ile eklenir.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string | null } }).auth.token;
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Task", "Project", "Customer", "Lead", "Finance",
    "User", "Document", "SEO", "Dashboard", "Announcement",
  ],
  // Panelde taze veri: cache'i çok uzun tutma ve mount/odak/yeniden bağlanınca
  // yeniden çek. Böylece sayfalar arası gezerken eski veri görünmez.
  keepUnusedDataFor: 30,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: () => ({}),
});
