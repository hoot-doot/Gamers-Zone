import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001' }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Sales",
    "Dashboard",
    "KhaltiTransactions",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getDashboard: build.query({
      query: () => "general/dashboard",
      providesTags: ["Dashboard"],
    }),
    getKhaltiTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "client/khalti",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["KhaltiTransactions"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `client/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    createProduct: build.mutation({
      query: (product) => ({
        url: "products",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetSalesQuery,
  useGetDashboardQuery,
  useGetKhaltiTransactionsQuery,
  useDeleteProductMutation,
  useCreateProductMutation
} = api;
