// scripts/seed-data.ts
import fs from 'fs';
import path from 'path';

const players = [
  { id: 'player1', name: 'Roger Federer' },
  { id: 'player2', name: 'Serena Williams' },
  { id: 'player3', name: 'Rafael Nadal' },
  { id: 'player4', name: 'Naomi Osaka' },
  { id: 'player5', name: 'Novak Djokovic' },
];

const matches = [
  { id: 'match1', playerA: 'Roger Federer', playerB: 'Rafael Nadal', score: '6-4, 7-5' },
  { id: 'match2', playerA: 'Serena Williams', playerB: 'Naomi Osaka', score: '6-3, 6-2' },
  { id: 'match3', playerA: 'Novak Djokovic', playerB: 'Rafael Nadal', score: '7-6, 6-7, 6-4' },
];

const data = { players, matches };

const OUTPUT_PATH = path.join(__dirname, '../src/data/fakeData.json');

// Create folder if missing
fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2));
console.log(`✅ Seed data written to ${OUTPUT_PATH}`);

