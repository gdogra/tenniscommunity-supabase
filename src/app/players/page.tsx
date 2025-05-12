import ProtectedRoute from '@/components/ProtectedRoute';

const players = [
  { id: 1, name: 'Serena Williams', image: '/players/serena.jpg', wins: 35 },
  { id: 2, name: 'Roger Federer', image: '/players/federer.jpg', wins: 40 },
  { id: 3, name: 'Rafael Nadal', image: '/players/nadal.jpg', wins: 38 },
];

export default function PlayersPage() {
  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Players</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {players.map((player) => (
            <div key={player.id} className="p-4 bg-white rounded-xl shadow-md flex flex-col items-center">
              <img
                src={player.image}
                alt={player.name}
                className="w-24 h-24 object-cover rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold">{player.name}</h2>
              <p className="text-gray-600">{player.wins} Wins</p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}

