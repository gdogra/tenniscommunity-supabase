'use client';

import Layout from '@/components/Layout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function LeaderboardPage() {
  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
          <p>See who's climbing to the top! 🏆</p>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

