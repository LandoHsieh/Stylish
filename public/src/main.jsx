import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

//import { ,  } from 'react-query';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        //實驗功能：在Query獲取到資訊前停止渲染
        suspense: false
      }
    }
  }
);



ReactDOM.createRoot(document.getElementById('root')).render(

  // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  // </React.StrictMode>
)
