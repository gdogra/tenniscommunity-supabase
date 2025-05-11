'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex space-x-6">
        <Link href="/admin" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <Link href="/admin/users" className="text-lg font-semibold text-gray-700 hover:text-blue-600">
          Manage Users
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </nav>
  );
}

