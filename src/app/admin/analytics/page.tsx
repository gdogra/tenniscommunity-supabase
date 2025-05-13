// src/app/admin/analytics/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/hooks/useUser';

interface AdminUser {
  id: string;
  email: string;
  is_admin: boolean;
}

export default function AnalyticsPage() {
  const supabase = createClient();
  const { user } = useUser();
  const [analytics, setAnalytics] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    if (!('is_admin' in user)) return; // ✅ Safely check if is_admin exists

    const fetchAnalytics = async () => {
      const { data, error } = await supabase.from('analytics').select('*');
      if (error) {
        console.error('Error fetching analytics:', error);
      } else {
        setAnalytics(data);
      }
    };

    fetchAnalytics();
  }, [user, supabase]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Analytics</h1>
      {analytics ? (
        <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(analytics, null, 2)}</pre>
      ) : (
        <p>Loading analytics...</p>
      )}
    </div>
  );
}

