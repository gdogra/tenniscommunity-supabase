'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function AdminAnalyticsPage() {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?.is_admin) return;
    fetchAnalytics();
  }, [user]);

  const fetchAnalytics = async () => {
    setLoading(true);

    const { count: users, error: userError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    const { count: matches, error: matchError } = await supabase
      .from('matches')
      .select('*', { count: 'exact', head: true });

    const { count: challenges, error: challengeError } = await supabase
      .from('challenges')
      .select('*', { count: 'exact', head: true });

    if (!userError) setUserCount(users || 0);
    if (!matchError) setMatchCount(matches || 0);
    if (!challengeError) setChallengeCount(challenges || 0);

    setLoading(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">📈 Admin Analytics</h1>
      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Users</h2>
            <p className="text-3xl font-bold">{userCount}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Matches</h2>
            <p className="text-3xl font-bold">{matchCount}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Challenges</h2>
            <p className="text-3xl font-bold">{challengeCount}</p>
          </div>
        </div>
      )}
    </div>
  );
}

