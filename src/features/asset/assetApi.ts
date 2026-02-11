import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

/* ================================
   Types
================================ */

export interface Asset {
  id: string
  name: string
  type: string
  model: string
  serialNumber?: string | null
  description?: string | null
  location: string

  client: {
    id: string
    name: string
    company?: string | null
  }

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

export interface PaginatedAssetsResponse {
  data: Asset[]
  meta:{
    pagination:{
      total:number
      page:number
      limit:number
      totalPages:number
      hasNext:boolean
      hasPrevious:boolean
    }
  }
}

/* ================================
   API
================================ */

export const assetApi = createApi({
  reducerPath: "assetApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Assets"],
  endpoints: (builder) => ({

    /* ======================
       GET ASSETS (Paginated)
    =======================*/
    getAssets: builder.query<
      PaginatedAssetsResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: "/assets",
        method: "GET",
        params,
      }),

      // ✅ granular tagging (professional)
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({
              type: "Assets" as const,
              id,
            })),
            { type: "Assets", id: "LIST" },
          ]
          : [{ type: "Assets", id: "LIST" }],
    }),

    /* ======================
       GET SINGLE ASSET
    =======================*/
    getAssetById: builder.query<Asset, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Assets", id },
      ],
    }),

    /* ======================
       CREATE ASSET
    =======================*/
    createAsset: builder.mutation<Asset, CreateAssetPayload>({
      query: (body) => ({
        url: "/assets",
        method: "POST",
        data: body,
      }),

      // Only invalidate list
      invalidatesTags: [{ type: "Assets", id: "LIST" }],
    }),

    /* ======================
       UPDATE ASSET
    =======================*/
    updateAsset: builder.mutation<
      Asset,
      { id: string; data: Partial<CreateAssetPayload> }
    >({
      query: ({ id, data }) => ({
        url: `/assets/${id}`,
        method: "PATCH",
        data,
      }),

      invalidatesTags: (_result, _error, { id }) => [
        { type: "Assets", id },
        { type: "Assets", id: "LIST" },
      ],
    }),

    /* ======================
       DELETE ASSET
    =======================*/
    deleteAsset: builder.mutation<void, string>({
      query: (id) => ({
        url: `/assets/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (_result, _error, id) => [
        { type: "Assets", id },
        { type: "Assets", id: "LIST" },
      ],
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
