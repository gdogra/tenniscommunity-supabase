'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser'; // your custom hook
import { AppUser } from '@/types/app'; // we defined this earlier

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useUser();

  const appUser = user as AppUser;

  useEffect(() => {
    if (appUser && !appUser.user_metadata?.is_admin) {
      router.push('/unauthorized');
    }
  }, [appUser, router]);

  return <>{children}</>;
}

