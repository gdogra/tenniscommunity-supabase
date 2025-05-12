'use client';

import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <div className="font-bold text-lg">Tennis Community</div>
      <div className="flex gap-4">
        {user && (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/matches">Matches</Link>
            <Link href="/players">Players</Link>
            <Link href="/leaderboard">Leaderboard</Link>
            <button onClick={logout} className="ml-4 bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link href="/login" className="bg-green-500 text-white px-3 py-1 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

