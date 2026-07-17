'use client';

import { Toaster } from 'sonner';

export function ToastProvider() {

  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: 'rgba(30, 41, 59, 0.95)',
          border: '1px solid rgba(51, 65, 85, 0.5)',
          color: '#f1f5f9',
          borderRadius: '12px',
          backdropFilter: 'blur(20px)',
        },
      }}
    />
  );
}
