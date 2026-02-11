import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"

/* ================================
   Types
================================ */

export interface Employee {
  id: string
  e_id?: string | null
  name?: string | null
  email?: string | null
  phone?: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateEmployeePayload {
  e_id?: string
  name?: string
  email?: string
  phone?: string
}

export interface EmployeeListQuery {
  page?: number
  limit?: number
  search?: string
}

export interface PaginatedEmployeesResponse {
  data: Employee[]
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

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Employees"],
  endpoints: (builder) => ({

    /* ======================
       GET EMPLOYEES
    =======================*/
    getEmployees: builder.query<
      PaginatedEmployeesResponse,
      EmployeeListQuery | void
    >({
      query: (params) => ({
        url: "/employees",
        method: "GET",
        params,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: "Employees" as const,
                id,
              })),
              { type: "Employees", id: "LIST" },
            ]
          : [{ type: "Employees", id: "LIST" }],
    }),

    /* ======================
       GET SINGLE EMPLOYEE
    =======================*/
    getEmployeeById: builder.query<Employee, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        { type: "Employees", id },
      ],
    }),

    /* ======================
       CREATE EMPLOYEE
    =======================*/
    createEmployee: builder.mutation<
      Employee,
      CreateEmployeePayload
    >({
      query: (body) => ({
        url: "/employees",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [{ type: "Employees", id: "LIST" }],
    }),

    /* ======================
       UPDATE EMPLOYEE
    =======================*/
    updateEmployee: builder.mutation<
      Employee,
      { id: string; data: Partial<CreateEmployeePayload> }
    >({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Employees", id },
        { type: "Employees", id: "LIST" },
      ],
    }),

    /* ======================
       DELETE EMPLOYEE
    =======================*/
    deleteEmployee: builder.mutation<void, string>({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Employees", id },
        { type: "Employees", id: "LIST" },
      ],
    }),
  }),
})

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi
