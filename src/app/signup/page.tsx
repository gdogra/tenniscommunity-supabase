'use client';

import { useAuth } from '@/hooks/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const { user, loginWithGoogle } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>

        <div className="flex items-center justify-center">
          <button
            onClick={loginWithGoogle}
            className="flex items-center gap-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
          >
            <span>Sign Up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

