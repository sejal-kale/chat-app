import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter } from 'react-router-dom';
import { SocketProvider } from './context/SocketContext';  // Correct import



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider> 
    </AuthProvider>,
  </BrowserRouter>
)
