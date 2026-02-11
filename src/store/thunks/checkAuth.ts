import { createAsyncThunk } from "@reduxjs/toolkit"
import { authService } from "@/services/authService"
import { setUser, clearUser, finishChecking } from "../../features/auth/authSlice"

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { dispatch }) => {
    try {
      const user = await authService.getProfile()
      dispatch(setUser(user))
    } catch {
      dispatch(clearUser())
    } finally {
      dispatch(finishChecking())
    }
  }
)
