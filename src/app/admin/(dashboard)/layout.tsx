import React from 'react';
import type { Metadata } from 'next';
import AdminNav from '../components/AdminNav';

export const metadata: Metadata = {
  title: 'Admin | ITtoAI',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-secondary">
      <AdminNav />
      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
