import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthFlowState {
  pendingEmail: string | null
  resetOTPVerified: boolean
}

const initialState: AuthFlowState = {
  pendingEmail: null,
  resetOTPVerified: false,
}

const authFlowSlice = createSlice({
  name: "authFlow",
  initialState,
  reducers: {
    setPendingEmail(state, action: PayloadAction<string>) {
      state.pendingEmail = action.payload
    },
    setResetOTPVerified(state, action: PayloadAction<boolean>) {
      state.resetOTPVerified = action.payload
    },

    clearPendingEmail(state) {
      state.pendingEmail = null
    },
    clearResetOTPVerified(state) {
      state.resetOTPVerified = false
    },
  },
})

export const {
  setPendingEmail,
  setResetOTPVerified,
  clearPendingEmail,
  clearResetOTPVerified
} = authFlowSlice.actions

export default authFlowSlice.reducer
