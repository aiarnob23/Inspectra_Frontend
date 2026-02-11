import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

export interface Asset {
  id: string
  name: string
  type: string
  model: string
  serialNumber?: string | null
  description?: string | null
  location: string
  clientId: string
  subscriberId: string
  createdAt: string
  updatedAt: string
}

export interface CreateAssetPayload {
  name: string
  type: string
  model: string
  serialNumber?: string
  description?: string
  location: string
  clientId: string
}

export interface PaginationQuery {
  page?: number
  limit?: number
  search?: string
}

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Assets"],
  endpoints: (builder) => ({
    // GET ALL
    getAssets: builder.query<Asset[], PaginationQuery | void>({
      query: (params) => ({
        url: "/assets",
        method: "GET",
        params,
      }),
      transformResponse: (res: any) => res.data,
      providesTags: ["Assets"],
    }),

    // GET BY ID
    getAssetById: builder.query<Asset, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => res.data,
      providesTags: ["Assets"],
    }),

    // CREATE
    createAsset: builder.mutation<Asset, CreateAssetPayload>({
      query: (body) => ({
        url: "/assets",
        method: "POST",
        data: body,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["Assets"],
    }),

    // UPDATE
    updateAsset: builder.mutation<
      Asset,
      { id: string; data: Partial<CreateAssetPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/assets/${id}`,
        method: "PATCH",
        data,
      }),
      transformResponse: (res: any) => res.data,
      invalidatesTags: ["Assets"],
    }),

    // DELETE
    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Assets"],
    }),
  }),
})

export const {
  useGetAssetsQuery,
  useGetAssetByIdQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetApi
