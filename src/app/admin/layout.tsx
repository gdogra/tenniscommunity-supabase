import { ReactNode } from 'react';
import AdminGuard from '@/components/auth/AdminGuard'; // NEW component

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      {children}
    </AdminGuard>
  );
}

