import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function useUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  return { user };
}

