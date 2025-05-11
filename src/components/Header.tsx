'use client';

import Link from 'next/link';
import LogoutButton from './LogoutButton';
import { useAuth } from '@/hooks/useAuth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TennisCommunity
        </Link>
        <nav className="flex space-x-6">
          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <Link href="/dashboard/players">Players</Link>
              <Link href="/dashboard/matches">Matches</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link href="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

