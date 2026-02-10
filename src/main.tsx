import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import {Provider} from 'react-redux'
import router from './routes/index.tsx'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { Toaster } from 'sonner'
import { persistor, store } from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster
        position="top-right"
        className="z-9999"
        richColors
      />
      <RouterProvider router={router} />
    </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
