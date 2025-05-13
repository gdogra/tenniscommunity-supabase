'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

interface Content {
  id: string;
  title: string;
  body: string;
  created_at: string;
}

export default function ContentAdminPage() {
  const { user } = useAuth();
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      const { data, error } = await supabase.from('content').select('*').order('created_at', { ascending: false });
      if (error) console.error(error.message);
      else setContents(data || []);
    };
    fetchContents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const { error } = await supabase.from('content').delete().eq('id', id);
    if (error) alert(error.message);
    else setContents(contents.filter((c) => c.id !== id));
  };

  if (!(user as any)?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📰 Manage Announcements</h1>
      <Link href="/admin/content/new" className="inline-block mb-4 text-blue-600 hover:underline">➕ Create New</Link>
      <ul className="space-y-4">
        {contents.map((content) => (
          <li key={content.id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold">{content.title}</h2>
            <p className="text-gray-600 text-sm">{new Date(content.created_at).toLocaleDateString()}</p>
            <div className="mt-2 flex gap-4">
              <Link href={`/admin/content/edit/${content.id}`} className="text-blue-600 hover:underline">Edit</Link>
              <button onClick={() => handleDelete(content.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

