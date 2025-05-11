'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Division {
  id: string;
  name: string;
  level: string;
}

export default function DivisionsAdminPage() {
  const { user } = useAuth();
  const [divisions, setDivisions] = useState<Division[]>([]);

  useEffect(() => {
    const fetchDivisions = async () => {
      const { data, error } = await supabase.from('divisions').select('*');
      if (error) console.error(error.message);
      else setDivisions(data || []);
    };
    fetchDivisions();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this division?')) return;
    const { error } = await supabase.from('divisions').delete().eq('id', id);
    if (error) alert(error.message);
    else setDivisions(divisions.filter((division) => division.id !== id));
  };

  if (!user?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">🏆 Manage Divisions</h1>
      <Link href="/admin/divisions/new" className="inline-block mb-4 text-blue-600 hover:underline">
        ➕ Add New Division
      </Link>
      <table className="w-full table-auto border-collapse bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Level</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {divisions.map((division) => (
            <tr key={division.id} className="border-t">
              <td className="p-3">{division.name}</td>
              <td className="p-3">{division.level}</td>
              <td className="p-3 space-x-2">
                <Link href={`/admin/divisions/edit/${division.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(division.id)} className="text-red-600 hover:underline">
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

