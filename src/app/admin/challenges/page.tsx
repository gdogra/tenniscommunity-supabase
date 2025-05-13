'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import useUser from '@/hooks/useUser';

export default function ChallengesPage() {
  const supabase = createClient();
  const user = useUser(); // <-- FIXED

  const [challenges, setChallenges] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.is_admin) return;

    const fetchChallenges = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('challenges').select('*');
      if (error) console.error(error);
      else setChallenges(data || []);
      setLoading(false);
    };

    fetchChallenges();
  }, [user, supabase]);

  return (
    <div>
      <h1>Challenges</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge.id}>{challenge.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

