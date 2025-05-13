'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && !(user as any)?.user_metadata?.is_admin) {
      router.push('/unauthorized');
    }
  }, [user, router]);

  return <>{children}</>;
}

