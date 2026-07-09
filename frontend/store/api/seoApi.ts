import { baseApi } from "./baseApi";

export interface SeoCampaign {
  id: string;
  name: string;
  customerId?: string | null;
  targetCountry?: string | null;
  status: string;
  monthlyBudget?: number | null;
  createdAt: string;
}

export interface SeoKeyword {
  id: string;
  campaignId: string;
  keyword: string;
  targetUrl?: string | null;
  currentRank?: number | null;
  previousRank?: number | null;
  searchVolume?: number | null;
}

export const seoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCampaigns: builder.query<SeoCampaign[], void>({
      query: () => "/seo/campaigns",
      providesTags: ["SEO"],
    }),
    getCampaign: builder.query<{ campaign: SeoCampaign; keywords: SeoKeyword[] }, string>({
      query: (id) => `/seo/campaigns/${id}`,
      providesTags: ["SEO"],
    }),
    createCampaign: builder.mutation<SeoCampaign, { name: string; customerId?: string; targetCountry?: string; monthlyBudget?: number }>({
      query: (body) => ({ url: "/seo/campaigns", method: "POST", body }),
      invalidatesTags: ["SEO"],
    }),
    getKeywords: builder.query<SeoKeyword[], { campaign_id?: string } | void>({
      query: (params) => ({ url: "/seo/keywords", params: params ?? undefined }),
      providesTags: ["SEO"],
    }),
    createKeyword: builder.mutation<SeoKeyword, { campaignId: string; keyword: string; targetUrl?: string }>({
      query: (body) => ({ url: "/seo/keywords", method: "POST", body }),
      invalidatesTags: ["SEO"],
    }),
    updateRank: builder.mutation<SeoKeyword, { id: string; currentRank?: number; searchVolume?: number }>({
      query: ({ id, ...body }) => ({ url: `/seo/keywords/${id}/rank`, method: "PATCH", body }),
      invalidatesTags: ["SEO"],
    }),
  }),
});

export const {
  useGetCampaignsQuery,
  useGetCampaignQuery,
  useCreateCampaignMutation,
  useGetKeywordsQuery,
  useCreateKeywordMutation,
  useUpdateRankMutation,
} = seoApi;
