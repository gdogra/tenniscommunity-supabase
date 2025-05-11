'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Match {
  id: string;
  player1_id: string;
  player2_id: string;
  status: string;
  winner_id?: string;
}

export default function MatchesAdminPage() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data, error } = await supabase.from('matches').select('*');
      if (error) console.error(error.message);
      else setMatches(data || []);
    };
    fetchMatches();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this match?')) return;
    const { error } = await supabase.from('matches').delete().eq('id', id);
    if (error) alert(error.message);
    else setMatches(matches.filter((match) => match.id !== id));
  };

  if (!user?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🎾 Manage Matches</h1>
      <Link href="/admin/matches/new" className="inline-block mb-4 text-blue-600 hover:underline">
        ➕ Add New Match
      </Link>
      <table className="w-full table-auto border-collapse bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Player 1</th>
            <th className="p-3 text-left">Player 2</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Winner</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id} className="border-t">
              <td className="p-3">{match.player1_id}</td>
              <td className="p-3">{match.player2_id}</td>
              <td className="p-3">{match.status}</td>
              <td className="p-3">{match.winner_id || '-'}</td>
              <td className="p-3 space-x-2">
                <Link href={`/admin/matches/edit/${match.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(match.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

