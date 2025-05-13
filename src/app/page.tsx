'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Tennis Community</h1>
      <p className="mb-6 text-lg text-gray-600">A place for players to connect and compete.</p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          className="text-lg px-6 py-3"
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
        <Button
          className="text-lg px-6 py-3"
          onClick={() => router.push('/signup')}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

