import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from './App.jsx'
import './index.css'

export const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <main className="dark text-foreground bg-background">
        <App />
      </main>
    </QueryClientProvider>
  </React.StrictMode>,
)
