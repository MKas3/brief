'use client';

import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen items-center justify-center bg-neutral-900'>
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}
      >
        {children}
      </GoogleOAuthProvider>
    </div>
  );
}
