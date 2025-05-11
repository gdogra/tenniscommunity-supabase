'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface Player {
  id: string;
  display_name: string;
  division: string;
  points: number;
}

export default function PlayersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('points', { ascending: false });

      if (error) console.error(error.message);
      else setPlayers(data || []);

      setLoading(false);
    };
    fetchPlayers();
  }, [user]);

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Players</h1>
      {loading ? (
        <p>Loading...</p>
      ) : players.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <table className="w-full border-collapse shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Division</th>
              <th className="p-2">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id} className="border-t">
                <td className="p-2">{player.display_name}</td>
                <td className="p-2">{player.division}</td>
                <td className="p-2">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

