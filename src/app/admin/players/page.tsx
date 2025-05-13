'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Player {
  id: string;
  firstName: string;
  lastName: string;
  division: string;
  wins: number;
  losses: number;
}

export default function PlayersAdminPage() {
  const { user } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase.from('players').select('*');
      if (error) console.error(error.message);
      else setPlayers(data || []);
    };
    fetchPlayers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    const { error } = await supabase.from('players').delete().eq('id', id);
    if (error) alert(error.message);
    else setPlayers(players.filter((player) => player.id !== id));
  };

  if (!(user as any)?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">👥 Manage Players</h1>
      <Link href="/admin/players/new" className="inline-block mb-4 text-blue-600 hover:underline">
        ➕ Add New Player
      </Link>
      <table className="w-full table-auto border-collapse bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Division</th>
            <th className="p-3 text-left">Wins</th>
            <th className="p-3 text-left">Losses</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t">
              <td className="p-3">
                {player.firstName} {player.lastName}
              </td>
              <td className="p-3">{player.division}</td>
              <td className="p-3">{player.wins}</td>
              <td className="p-3">{player.losses}</td>
              <td className="p-3 space-x-2">
                <Link href={`/admin/players/edit/${player.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(player.id)} className="text-red-600 hover:underline">
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

