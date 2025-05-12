'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { toast, Toaster } from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const signOut = async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error('Failed to sign out.');
      } else {
        toast.success('Successfully signed out!');
        setTimeout(() => {
          router.push('/login');
        }, 1500); // Give users 1.5s to read the toast
      }
    };

    signOut();
  }, [router, supabase]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Toaster position="top-center" />
      <p>Signing out...</p>
    </div>
  );
}

