import { baseApi } from "./baseApi";

export interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budgetRange?: string;
  message: string;
}

export const publicApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    submitContact: builder.mutation<{ success: boolean }, ContactPayload>({
      query: (body) => ({ url: "/public/contact", method: "POST", body }),
    }),
    getPublicTeam: builder.query<{ id: string; fullName: string; role: string; expertiseTags: string[] }[], void>({
      query: () => "/public/team",
    }),
  }),
});

export const { useSubmitContactMutation, useGetPublicTeamQuery } = publicApi;
