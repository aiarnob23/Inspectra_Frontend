import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

export interface Inspection {
  id: string
  clientId: string
  assetId: string
  frequency:
  | "one_time"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly"
  status:
  | "pending"
  | "completed"
  | "missed"
  | "rescheduled"
  scheduledAt: string
  nextDueAt?: string | null

  client: {
    id: string
    name: string
  }

  asset: {
    id: string
    name: string
  }
}

export interface CreateInspectionPayload {
  clientId: string
  assetId: string
  frequency:
  | "one_time"
  | "weekly"
  | "monthly"
  | "quarterly"
  | "yearly"
  scheduledAt: string
}

export interface InspectionListQuery {
  page?: number
  limit?: number
  search?: string
}

export interface PaginatedInspectionResponse {
  data: Inspection[]
  meta: {
    pagination: {
      total: number
      page: number
      limit: number
      totalPages: number
      hasNext: boolean
      hasPrevious: boolean
    }
  }
}

export const inspectionApi = createApi({
  reducerPath: "inspectionApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Inspections"],
  endpoints: (builder) => ({
    getInspections: builder.query<
      PaginatedInspectionResponse,
      InspectionListQuery
    >({
      query: (params) => ({
        url: "/inspections",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
            ...result.data.map(({ id }) => ({
              type: "Inspections" as const,
              id,
            })),
            { type: "Inspections", id: "LIST" },
          ]
          : [{ type: "Inspections", id: "LIST" }],
    }),

    createInspection: builder.mutation<
      Inspection,
      CreateInspectionPayload
    >({
      query: (body) => ({
        url: "/inspections",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Inspections", id: "LIST" }],
    }),

    deleteInspection: builder.mutation<void, string>({
      query: (id) => ({
        url: `/inspections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: "Inspections", id },
        { type: "Inspections", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetInspectionsQuery,
  useCreateInspectionMutation,
  useDeleteInspectionMutation,
} = inspectionApi
