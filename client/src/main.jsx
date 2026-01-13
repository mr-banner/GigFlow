import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from './components/ui/sonner'
import { GigProvider } from './context/GigContext'
import { BidProvider } from './context/BidContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GigProvider>
        <BidProvider>
          <App />
        </BidProvider>
      </GigProvider>
      <Toaster richColors position="top-right" />
    </AuthProvider>
  </StrictMode>,
)
