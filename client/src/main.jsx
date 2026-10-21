import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './styles/index.css'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(<React.StrictMode><QueryClientProvider client={queryClient}><HelmetProvider><BrowserRouter><App /></BrowserRouter><Toaster position="top-right" /></HelmetProvider></QueryClientProvider></React.StrictMode>)
