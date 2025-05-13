'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function EditDivisionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    level: '',
  });

  useEffect(() => {
    const fetchDivision = async () => {
      const { data, error } = await supabase.from('divisions').select('*').eq('id', id).single();
      if (error) console.error(error.message);
      else setFormData(data || {});
    };
    if (id) fetchDivision();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('divisions').update(formData).eq('id', id);
    if (error) {
      alert('Error updating division: ' + error.message);
    } else {
      router.push('/admin/divisions');
    }
  };

  if (!(user as any)?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Division</h1>
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
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Division
        </button>
      </form>
    </div>
  );
}

