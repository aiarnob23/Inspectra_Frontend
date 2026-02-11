import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "@/lib/axiosBaseQuery"
import type { AuthUser } from "./authSlice"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    // ----------------------------
    // GET PROFILE
    // ----------------------------
    getProfile: builder.query<AuthUser, void>({
      query: () => ({
        url: "/auth/profile",
        method: "GET",
      }),
    }),

    // ----------------------------
    // REGISTER
    // ----------------------------
    register: builder.mutation<any, any>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        data: body,
      }),
    }),

    // ----------------------------
    // LOGIN
    // ----------------------------
    login: builder.mutation<
      { user: AuthUser },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        data: body,
      }),
      transformResponse: (response: any) => response.data,
    }),

    // ----------------------------
    // VERIFY EMAIL
    // ----------------------------
    verifyEmail: builder.mutation<
      { user: AuthUser },
      { email: string; code: string }
    >({
      query: (body) => ({
        url: "/auth/verify-email",
        method: "POST",
        data: body,
      }),
    }),

    // ----------------------------
    // LOGOUT
    // ----------------------------
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
})

export const {
  useGetProfileQuery,
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi
