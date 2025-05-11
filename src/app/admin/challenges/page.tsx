'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Challenge {
  id: string;
  challenger_id: string;
  opponent_id: string;
  status: string;
}

export default function AdminChallengesPage() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.is_admin) return;

    const fetchChallenges = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('challenges').select('*');
      if (error) {
        console.error('Error fetching challenges:', error.message);
      } else {
        setChallenges(data || []);
      }
      setLoading(false);
    };

    fetchChallenges();
  }, [user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Challenges</h1>
      {loading ? (
        <p>Loading challenges...</p>
      ) : (
        <table className="w-full table-auto border-collapse bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Challenge ID</th>
              <th className="p-4 text-left">Challenger</th>
              <th className="p-4 text-left">Opponent</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((challenge) => (
              <tr key={challenge.id} className="border-t">
                <td className="p-4">{challenge.id}</td>
                <td className="p-4">{challenge.challenger_id}</td>
                <td className="p-4">{challenge.opponent_id}</td>
                <td className="p-4">{challenge.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

