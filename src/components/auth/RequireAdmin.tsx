'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface RequireAdminProps {
  children: React.ReactNode;
}

export default function RequireAdmin({ children }: RequireAdminProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading && user) {
      const checkAdmin = async () => {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error checking admin role:', error.message);
          setIsAdmin(false);
          return;
        }

        setIsAdmin(data?.role === 'admin');
      };

      checkAdmin();
    } else if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (isAdmin === false) {
      router.push('/unauthorized');
    }
  }, [isAdmin, router]);

  if (loading || isAdmin === null) {
    return <div className="p-6 text-center">Checking permissions...</div>;
  }

  return <>{children}</>;
}

