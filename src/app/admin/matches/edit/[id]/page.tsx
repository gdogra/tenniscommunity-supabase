'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function EditMatchPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    player1_id: '',
    player2_id: '',
    status: '',
    winner_id: '',
  });

  useEffect(() => {
    const fetchMatch = async () => {
      const { data, error } = await supabase.from('matches').select('*').eq('id', id).single();
      if (error) console.error(error.message);
      else setFormData(data || {});
    };
    if (id) fetchMatch();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('matches').update(formData).eq('id', id);
    if (error) {
      alert('Error updating match: ' + error.message);
    } else {
      router.push('/admin/matches');
    }
  };

  if (!user?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Match</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="player1_id"
          placeholder="Player 1 ID"
          className="w-full p-2 border rounded"
          value={formData.player1_id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="player2_id"
          placeholder="Player 2 ID"
          className="w-full p-2 border rounded"
          value={formData.player2_id}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          className="w-full p-2 border rounded"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input
          type="text"
          name="winner_id"
          placeholder="Winner ID (optional)"
          className="w-full p-2 border rounded"
          value={formData.winner_id}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Match
        </button>
      </form>
    </div>
  );
}

