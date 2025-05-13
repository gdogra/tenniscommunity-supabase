'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import useUser from '@/hooks/useUser';

export default function AnalyticsPage() {
  const supabase = createClient();
  const user = useUser(); // <-- FIXED (no { user })

  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (!(user as any)?.is_admin) return;

    const fetchAnalytics = async () => {
      const { data, error } = await supabase.from('analytics').select('*');
      if (error) console.error(error);
      else setAnalytics(data);
    };

    fetchAnalytics();
  }, [user, supabase]);

  return (
    <div>
      <h1>Analytics</h1>
      {analytics ? (
        <pre>{JSON.stringify(analytics, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

