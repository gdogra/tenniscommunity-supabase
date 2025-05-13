'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function EditPlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    division: '',
    wins: 0,
    losses: 0,
  });

  useEffect(() => {
    const fetchPlayer = async () => {
      const { data, error } = await supabase.from('players').select('*').eq('id', id).single();
      if (error) {
        console.error(error.message);
      } else {
        setFormData(data || {});
      }
    };
    if (id) fetchPlayer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'wins' || name === 'losses' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('players').update(formData).eq('id', id);
    if (error) {
      alert('Error updating player: ' + error.message);
    } else {
      router.push('/admin/players');
    }
  };

  if (!(user as any)?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Player</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <select
          name="division"
          className="w-full p-2 border rounded"
          value={formData.division}
          onChange={handleChange}
          required
        >
          <option value="">Select Division</option>
          <option value="3.6">3.6</option>
          <option value="4.0">4.0</option>
          <option value="4.5">4.5</option>
          <option value="5.0">5.0</option>
        </select>
        <input
          type="number"
          name="wins"
          placeholder="Wins"
          className="w-full p-2 border rounded"
          value={formData.wins}
          onChange={handleChange}
        />
        <input
          type="number"
          name="losses"
          placeholder="Losses"
          className="w-full p-2 border rounded"
          value={formData.losses}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Player
        </button>
      </form>
    </div>
  );
}

