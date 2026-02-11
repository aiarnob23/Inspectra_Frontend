import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

// -----------------------------
// Types
// -----------------------------

export interface Client {
  id: string
  name: string
  email: string
  company?: string | null
  phone?: string | null
  address?: string | null
  status: "active" | "inactive"
  subscriberId: string
  createdAt: string
  updatedAt: string
}

export interface CreateClientPayload {
  name: string
  email: string
  company?: string
  phone?: string
  address?: string
  status?: "active" | "inactive"
}

export interface PaginationQuery {
  page?: number
  limit?: number
}

export const clientApi = createApi({
  reducerPath: "clientApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    // --------------------------------
    // GET ALL CLIENTS
    // --------------------------------
    getClients: builder.query<Client[], PaginationQuery | void>({
      query: (params) => ({
        url: "/clients",
        method: "GET",
        params,
      }),
      transformResponse: (res: any) => res.data,
      providesTags: ["Clients"],
    }),

    // --------------------------------
    // GET CLIENT BY ID
    // --------------------------------
    getClientById: builder.query<Client, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => res.data,
      providesTags: ["Clients"],
    }),

    // --------------------------------
    // CREATE CLIENT
    // --------------------------------
    createClient: builder.mutation<Client, CreateClientPayload>({
      query: (body) => ({
        url: "/clients",
        method: "POST",
        data: body,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["Clients"],
    }),

    // --------------------------------
    // IMPORT CSV
    // --------------------------------
    importClientsCSV: builder.mutation<any, any>({
      query: (body) => ({
        url: "/clients/import-csv",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Clients"],
    }),

    // --------------------------------
    // UPDATE CLIENT
    // --------------------------------
    updateClient: builder.mutation<
      Client,
      { id: string; data: Partial<CreateClientPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/clients/${id}`,
        method: "PATCH",
        data,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["Clients"],
    }),

    // --------------------------------
    // DELETE CLIENT
    // --------------------------------
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useImportClientsCSVMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi
