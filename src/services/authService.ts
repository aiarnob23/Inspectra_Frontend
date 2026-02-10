

// -------------------------
// Types
// -------------------------

import { api } from "@/lib/api"

export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role: "user" | "admin" | "subscriber" | "employee"
  status: "active" | "inactive" | "suspended" | "pending_verification"
  phoneNumber?: string
}

export interface AuthResponse {
  user: AuthUser
  token: string
  expiresIn: string
}

// -------------------------
// Auth Service
// -------------------------

export const authService = {
  // -------------------------
  // Register
  // -------------------------
  register: async (data: {
    email: string
    password: string
    confirmPassword: string
    firstName?: string
    lastName?: string
    phoneNumber?: string
  }) => {
    const res = await api.post("/auth/register", data)
    return res.data
  },

  // -------------------------
  // Login
  // -------------------------
  login: async (data: { email: string; password: string }): Promise<AuthResponse> => {
    const res = await api.post("/auth/login", data)
    return res.data.data
  },

  // -------------------------
  // Verify Email (OTP)
  // -------------------------
  verifyEmail: async (data: { email: string; code: number }): Promise<AuthResponse> => {
    const res = await api.post("/auth/verify-email", data)
    return res.data.data
  },

  // -------------------------
  // Resend Email Verification
  // -------------------------
  resendEmailVerification: async (email: string) => {
    const res = await api.post("/auth/resend-email-verification", { email })
    return res.data
  },

  // -------------------------
  // Forgot Password
  // -------------------------
  forgotPassword: async (email: string) => {
    const res = await api.post("/auth/forgot-password", { email })
    return res.data
  },

  // -------------------------
  // Verify Reset Password OTP
  // -------------------------
  verifyResetPasswordOTP: async (data: {
    email: string
    code: number
  }) => {
    const res = await api.post("/auth/verify-reset-password-OTP", data)
    return res.data
  },

  // -------------------------
  // Reset Password
  // -------------------------
  resetPassword: async (data: {
    email: string
    newPassword: string
  }) => {
    const res = await api.post("/auth/reset-password", data)
    return res.data
  },

  // -------------------------
  // Change Password (logged in)
  // -------------------------
  changePassword: async (data: {
    currentPassword: string
    newPassword: string
  }) => {
    const res = await api.post("/auth/change-password", data)
    return res.data
  },

  // -------------------------
  // Get Profile
  // -------------------------
  getProfile: async (): Promise<AuthUser> => {
    const res = await api.get("/auth/profile")
    return res.data.data
  },

  // -------------------------
  // Verify Token
  // -------------------------
  verifyToken: async (token?: string) => {
    const res = await api.post("/auth/verify", token ? { token } : {})
    return res.data.data
  },

  // -------------------------
  // Refresh Token
  // -------------------------
  refreshToken: async (token?: string): Promise<AuthResponse> => {
    const res = await api.post("/auth/refresh", token ? { token } : {})
    return res.data.data
  },

  // -------------------------
  // Admin: Get users
  // -------------------------
  getUsers: async (params?: { page?: number; limit?: number }) => {
    const res = await api.get("/auth/users", { params })
    return res.data
  },
}
