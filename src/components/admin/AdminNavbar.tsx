'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function AdminNavbar() {
  const { user } = useAuth();

  if (!user?.is_admin) return null;

  return (
    <nav className="p-4 bg-gray-900 text-white space-x-4">
      <Link href="/admin/dashboard" className="hover:underline">
        Dashboard
      </Link>
      <Link href="/admin/matches" className="hover:underline">
        Manage Matches
      </Link>
      <Link href="/admin/challenges" className="hover:underline">
        Manage Challenges
      </Link>
      <Link href="/admin/analytics" className="hover:underline">
        Analytics
      </Link>
      <Link href="/admin/players/new" className="hover:underline">
        Add Player
      </Link>
    </nav>
  );
}

