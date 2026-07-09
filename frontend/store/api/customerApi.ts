import { baseApi } from "./baseApi";
import type { Customer } from "@/lib/types";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<Customer[], { country?: string; search?: string } | void>({
      query: (params) => ({ url: "/customers", params: params ?? undefined }),
      providesTags: ["Customer"],
    }),
    getCustomer: builder.query<{ customer: Customer; projects: unknown[] }, string>({
      query: (id) => `/customers/${id}`,
      providesTags: (_r, _e, id) => [{ type: "Customer", id }],
    }),
    createCustomer: builder.mutation<Customer, Partial<Customer> & { companyName: string }>({
      query: (body) => ({ url: "/customers", method: "POST", body }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation<Customer, { id: string; body: Partial<Customer> }>({
      query: ({ id, body }) => ({ url: `/customers/${id}`, method: "PUT", body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Customer", id }, "Customer"],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({ url: `/customers/${id}`, method: "DELETE" }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetCustomerQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
