import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/router.jsx';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './Contexts/AuthContext.jsx/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AosInit from './Utils/AosInit.jsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AosInit /> {/* ✅ AOS is initialized here */}
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'custom-toast',
            duration: 3000,
            style: {
              background: '#2d3748',
              color: '#e2e8f0',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: {
                primary: '#48bb78',
                secondary: 'white',
              },
            },
            error: {
              iconTheme: {
                primary: '#e53e3e',
                secondary: 'white',
              },
            },
          }}
        />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
