import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

/* ================================
   Types
================================ */

export interface Reminder {
  id: string
  inspectionId: string
  method: "email" | "sms" | "both"
  additionalNotes?: string | null
  status: "pending" | "processing" | "failed" | "success"
  scheduledAt: string
  isSent: boolean
  attempts: number
  failReason?: string | null
  createdAt: string

  inspection: {
    id: string
    scheduledAt: string
    asset: {
      name: string
      model: string
      location: string
    }
    client: {
      name: string
      email: string
    }
  }
}

export interface ReminderListQuery {
  page?: number
  limit?: number
  status?: string
}

export interface PaginatedReminderResponse {
  data: Reminder[]
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

/* ================================
   API
================================ */

export const reminderApi = createApi({
  reducerPath: "reminderApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Reminders"],
  endpoints: (builder) => ({
    getReminders: builder.query<
      PaginatedReminderResponse,
      ReminderListQuery
    >({
      query: (params) => ({
        url: "/reminders",
        method: "GET",
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Reminders" as const,
                id,
              })),
              { type: "Reminders", id: "LIST" },
            ]
          : [{ type: "Reminders", id: "LIST" }],
    }),

    deleteReminder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reminders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Reminders", id: "LIST" }],
    }),
  }),
})

export const {
  useGetRemindersQuery,
  useDeleteReminderMutation,
} = reminderApi
