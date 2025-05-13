'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    };

    getUser();
  }, []);

  return user;
}

