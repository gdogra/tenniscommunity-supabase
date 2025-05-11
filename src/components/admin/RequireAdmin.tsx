// src/components/admin/RequireAdmin.tsx
'use client';

import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/unauthorized');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}


// src/app/admin/page.tsx
'use client';

import RequireAdmin from '@/components/admin/RequireAdmin';
import AdminNavbar from '@/components/admin/AdminNavbar';

export default function AdminDashboardPage() {
  return (
    <RequireAdmin>
      <div className="p-8">
        <AdminNavbar />
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a href="/admin/users" className="border p-6 rounded-lg shadow hover:bg-gray-100">
            Manage Users
          </a>
          <a href="/admin/settings" className="border p-6 rounded-lg shadow hover:bg-gray-100">
            Site Settings
          </a>
        </div>
      </div>
    </RequireAdmin>
  );
}


// src/components/admin/AdminNavbar.tsx
'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="flex items-center justify-between mb-8">
      <h2 className="text-xl font-bold">Admin Panel</h2>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Logout
      </button>
    </nav>
  );
}


// src/app/unauthorized/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
      <p className="text-lg text-gray-700 mb-8">You do not have permission to access this page.</p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Return Home
      </button>
    </div>
  );
}

