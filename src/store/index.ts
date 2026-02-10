import { configureStore } from "@reduxjs/toolkit"
import authFlowReducer from "./slices/authFlowSlice"
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    authFlow: authFlowReducer,
    auth:authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
