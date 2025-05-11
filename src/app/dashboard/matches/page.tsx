'use client';

import { useMatchHistory } from '@/hooks/useMatchHistory';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function MatchesPage() {
  const { user } = useAuth();
  const { matches, loading } = useMatchHistory();
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Match History</h1>
      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p>No matches found.</p>
      ) : (
        <ul className="list-disc ml-5">
          {matches.map((match) => (
            <li key={match.id}>
              Match {match.id} - Status: {match.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

