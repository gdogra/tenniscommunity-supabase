'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/admin/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !user.user_metadata?.is_admin) {
      router.push('/unauthorized');
    }
  }, [user, router]);

  if (!user) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user.user_metadata?.is_admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  );
}

