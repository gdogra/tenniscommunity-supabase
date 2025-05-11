'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function NewDivisionPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    level: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('divisions').insert([formData]);
    if (error) {
      alert('Error creating division: ' + error.message);
    } else {
      router.push('/admin/divisions');
    }
  };

  if (!user?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">➕ New Division</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Division Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="level"
          placeholder="Skill Level (e.g., 4.0, 4.5)"
          className="w-full p-2 border rounded"
          value={formData.level}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Create Division
        </button>
      </form>
    </div>
  );
}

