import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

import authReducer from "@/features/auth/authSlice"
import authFlowReducer from "@/features/auth/authFlowSlice"
import { clientApi } from "@/features/clients/clientApi"
import { authApi } from "@/features/auth/authApi"
import { assetApi } from "@/features/asset/assetApi"

const rootReducer = combineReducers({
  auth: authReducer,
  authFlow: authFlowReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [assetApi.reducerPath]:assetApi.reducer,
})

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(clientApi.middleware, authApi.middleware, assetApi.middleware),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
