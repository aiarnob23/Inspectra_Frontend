import { configureStore } from "@reduxjs/toolkit"
import authFlowReducer from "./slices/authFlowSlice"

export const store = configureStore({
  reducer: {
    authFlow: authFlowReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
