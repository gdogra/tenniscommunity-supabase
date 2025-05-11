'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function NewContentPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('content').insert([{ title, body }]);
    if (error) alert(error.message);
    else router.push('/admin/content');
  };

  if (!user?.is_admin) return <p>Access Denied</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">➕ New Announcement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea className="w-full p-2 border rounded" placeholder="Body" rows={6} value={body} onChange={(e) => setBody(e.target.value)} required />
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Create</button>
      </form>
    </div>
  );
}

