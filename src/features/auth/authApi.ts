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
    // RESEND EMAIL VERIFICATION
    // ----------------------------
    resendEmailVerification: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/resnd-email-verification",
        method: "POST",
        data: body,
      })
    }),
    // ----------------------------
    // FORGOT PASSWORD (email <-send OTP)
    // ----------------------------
    forgotPassword: builder.mutation<
      { message: string },
      { email: string }
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        data: body,
      })
    }),

    // ----------------------------
    // VERIFY RESET PASSWORD OTP (verify OTP -> server)
    // ----------------------------
    verifyResetPasswordOTP: builder.mutation<
      { message: string },
      { email: string; code: string }
    >({
      query: (body) => ({
        url: "/auth/verify-reset-password-OTP",
        method: "POST",
        data: body,
      })
    }),

    // ----------------------------
    // RESET PASSWORD
    // ----------------------------
    resetPassword: builder.mutation<
      { message: string },
      { email: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        data: body,
      })
    }),

    // ----------------------------
    // CHANGE PASSWORD (logged in)
    // ----------------------------
    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Auth"],
    }),


    // ----------------------------
    // REFRESH TOKEN
    // ----------------------------
    refreshToken: builder.mutation<
      { user: AuthUser; token: string; expiresIn: number },
      { token: string }
    >({
      query: (body) => ({
        url: "/auth/refresh",
        method: "POST",
        data: body,
      }),
    }),

    // ----------------------------
    // VERIFY TOKEN
    // ----------------------------
    verifyToken: builder.mutation<
      { userId: string; email: string; role: string },
      void
    >({
      query: (body) => ({
        url: "/auth/verify",
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
  useResendEmailVerificationMutation,
  useForgotPasswordMutation,
  useVerifyResetPasswordOTPMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useRefreshTokenMutation,
  useVerifyTokenMutation,
  useVerifyEmailMutation,
  useLogoutMutation,
} = authApi
