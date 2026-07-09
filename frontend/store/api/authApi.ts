import { baseApi } from "./baseApi";
import type { AuthResponse, User } from "@/lib/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    register: builder.mutation<AuthResponse, { email: string; password: string; fullName: string }>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    me: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useMeQuery } = authApi;
