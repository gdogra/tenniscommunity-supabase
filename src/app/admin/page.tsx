'use client';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function AdminPage() {
  const { user } = useAuth();

  if (!user?.is_admin) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You must be an administrator to view this page.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">🛠 Admin Dashboard</h1>
      <p>Welcome, administrator!</p>
    </Layout>
  );
}

