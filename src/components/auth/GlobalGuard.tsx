'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import Spinner from '@/components/Spinner';

interface GlobalGuardProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function GlobalGuard({ children, adminOnly = false }: GlobalGuardProps) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.replace('/login');
    } else if (adminOnly && user.user_metadata?.is_admin !== true) {
      router.replace('/unauthorized');
    }
  }, [user, adminOnly, router]);

  if (!user) {
    return <Spinner />;
  }

  return <>{children}</>;
}

