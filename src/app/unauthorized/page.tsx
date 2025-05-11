'use client';

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-5xl font-bold text-red-600 mb-4">403</h1>
      <p className="text-lg text-gray-700 mb-6">You are not authorized to access this page.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        Go Home
      </Link>
    </div>
  );
}

