import { baseApi } from "./baseApi";
import type { Finance } from "@/lib/types";

export interface FinanceSummary {
  totalIncome: number;
  totalExpense: number;
  netProfit: number;
}

export interface ProfitShare {
  totalProfit: number;
  shares: { role: string; percentage: number; amount: number }[];
}

export const financeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getFinances: builder.query<Finance[], { type?: string; category?: string; project_id?: string } | void>({
      query: (params) => ({ url: "/finances", params: params ?? undefined }),
      providesTags: ["Finance"],
    }),
    getFinanceSummary: builder.query<FinanceSummary, void>({
      query: () => "/finances/summary",
      providesTags: ["Finance"],
    }),
    getProfitShare: builder.query<ProfitShare, string>({
      query: (projectId) => `/finances/profit-share/${projectId}`,
    }),
    createFinance: builder.mutation<Finance, Partial<Finance> & { type: string; amount: number; currency: string; date: string }>({
      query: (body) => ({ url: "/finances", method: "POST", body }),
      invalidatesTags: ["Finance", "Dashboard"],
    }),
    deleteFinance: builder.mutation<void, string>({
      query: (id) => ({ url: `/finances/${id}`, method: "DELETE" }),
      invalidatesTags: ["Finance", "Dashboard"],
    }),
  }),
});

export const {
  useGetFinancesQuery,
  useGetFinanceSummaryQuery,
  useGetProfitShareQuery,
  useCreateFinanceMutation,
  useDeleteFinanceMutation,
} = financeApi;
