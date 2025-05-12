import ProtectedRoute from '@/components/ProtectedRoute';

const matches = [
  { id: 1, player1: 'Roger Federer', player2: 'Rafael Nadal', date: '2025-05-10', winner: 'Federer' },
  { id: 2, player1: 'Serena Williams', player2: 'Naomi Osaka', date: '2025-05-08', winner: 'Williams' },
  { id: 3, player1: 'Novak Djokovic', player2: 'Carlos Alcaraz', date: '2025-05-07', winner: 'Djokovic' },
];

export default function MatchesPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Matches</h1>
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="p-4 bg-white rounded-xl shadow-md flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold">
                  {match.player1} vs {match.player2}
                </h2>
                <p className="text-gray-500">{new Date(match.date).toLocaleDateString()}</p>
              </div>
              <div className="text-green-600 font-bold">{match.winner} Won</div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

