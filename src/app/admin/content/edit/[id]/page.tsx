'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

export default function EditContentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase.from('content').select('*').eq('id', id).single();
      if (error) console.error(error.message);
      else {
        setTitle(data.title);
        setBody(data.body);
      }
    };
    if (id) fetchContent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('content').update({ title, body }).eq('id', id);
    if (error) alert(error.message);
    else router.push('/admin/content');
  };

  if (!(user as any)?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">✏️ Edit Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full p-2 border rounded" placeholder="Body" rows={6} value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Update</button>
      </form>
    </div>
  );
}

