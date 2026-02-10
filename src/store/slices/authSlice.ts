import { createSlice,type PayloadAction } from "@reduxjs/toolkit"

export interface AuthUser {
  id: string
  email: string
  firstName?: string
  lastName?: string | null
  role: "admin" | "subscriber" | "employee" | "user"
  status: "active" | "inactive" | "suspended" | "pending_verification"
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isChecking: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isChecking: true, // app startup
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload
      state.isAuthenticated = true
      state.isChecking = false
    },

    clearUser(state) {
      state.user = null
      state.isAuthenticated = false
      state.isChecking = false
    },

    finishChecking(state) {
      state.isChecking = false
    },
  },
})

export const { setUser, clearUser, finishChecking } = authSlice.actions
export default authSlice.reducer
