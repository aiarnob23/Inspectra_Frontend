import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import {Provider} from 'react-redux'
import router from './routes/index.tsx'
import { ThemeProvider } from './theme/theme-provider.tsx'
import { Toaster } from 'sonner'
import { store } from './store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <Toaster
        position="top-right"
        className="z-9999"
        richColors
      />
      <RouterProvider router={router} />
    </ThemeProvider>
    </Provider>
  </StrictMode>
)
