'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/dashboard', // redirect after Google login
      },
    });
    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form onSubmit={handleLogin} className="w-full max-w-md space-y-4 bg-white shadow-lg p-8 rounded">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded"
        >
          Login
        </button>

        <div className="text-center my-4 text-gray-500">OR</div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded"
        >
          Sign in with Google
        </button>

        <div className="text-center mt-4">
          <a href="/signup" className="text-blue-600 hover:underline">
            Don't have an account? Register
          </a>
        </div>
      </form>
    </div>
  );
}

