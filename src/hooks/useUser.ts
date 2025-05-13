// src/hooks/useUser.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AppUser } from '@/types/user';

export default function useUser() {
  const [user, setUser] = useState<AppUser | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser({
          id: user.id,
          email: user.email!,
          // Assume not admin unless you later extend
          is_admin: false, 
        });
      }
    };

    fetchUser();
  }, []);

  return user;
}

