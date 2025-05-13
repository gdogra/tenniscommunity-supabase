'use client';

import Layout from '@/components/Layout';
import { useAuth } from '@/hooks/useAuth';

export default function ManageUsersPage() {
  const { user } = useAuth();

  if (!(user as any)?.is_admin) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
        <p>You must be an administrator to view this page.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">👥 Manage Users</h1>
      <p>Here you can view and manage all users.</p>
    </Layout>
  );
}

