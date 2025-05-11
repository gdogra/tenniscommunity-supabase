'use client';

import { useAuth } from '@/hooks/useAuth';
import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            🎾 Tennis App
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            {user.is_admin && (
              <>
                <Link href="/admin" className="hover:underline">
                  Admin
                </Link>
                <Link href="/admin/users" className="hover:underline">
                  Manage Users
                </Link>
                <Link href="/admin/content" className="hover:underline">
                  Manage Content
                </Link>
              </>
            )}
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              {user.avatar_url ? (
                <img src={user.avatar_url} alt="avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                  {user.email?.[0].toUpperCase()}
                </div>
              )}
              {/* Email */}
              <span className="text-sm text-gray-700">Signed in as {user.email}</span>
            </div>
            <LogoutButton />
          </nav>

          {/* Mobile Nav Toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md p-4 space-y-2">
            <Link href="/dashboard" className="block hover:underline">
              Dashboard
            </Link>
            {user.is_admin && (
              <>
                <Link href="/admin" className="block hover:underline">
                  Admin
                </Link>
                <Link href="/admin/users" className="block hover:underline">
                  Manage Users
                </Link>
                <Link href="/admin/content" className="block hover:underline">
                  Manage Content
                </Link>
              </>
            )}
            <div className="mt-2">
              <span className="block text-sm text-gray-700 mb-2">
                Signed in as {user.email}
              </span>
              <LogoutButton />
            </div>
          </div>
        )}
      </header>

      {/* Main */}
      <main className="container mx-auto p-6">{children}</main>
    </div>
  );
}

