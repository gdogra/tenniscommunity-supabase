'use client';

import Link from 'next/link';

export default function AdminUnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Access Denied</h1>
      <p className="text-gray-700 mb-8 text-center max-w-md">
        You do not have permission to access the Admin Dashboard. Please contact the administrator if you believe this is a mistake.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}

