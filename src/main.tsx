import React from 'react'
import ReactDOM from 'react-dom/client'
import Rotas from './Router/Rotas'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.Suspense>
    <QueryClientProvider client={queryClient}>
      <Rotas />
    </QueryClientProvider>
  </React.Suspense>
)
