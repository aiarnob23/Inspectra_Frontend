import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthFlowState {
  pendingEmail: string | null
}

const initialState: AuthFlowState = {
  pendingEmail: null,
}

const authFlowSlice = createSlice({
  name: "authFlow",
  initialState,
  reducers: {
    setPendingEmail(state, action: PayloadAction<string>) {
      state.pendingEmail = action.payload
    },
    clearPendingEmail(state) {
      state.pendingEmail = null
    },
  },
})

export const {
  setPendingEmail,
  clearPendingEmail,
} = authFlowSlice.actions

export default authFlowSlice.reducer
