'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{ backgroundImage: "url('/background-tennis-court.jpg')" }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-200/60 via-white/30 to-blue-100/80"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 text-center text-gray-800">
        <motion.img
          src="/tennis-ball.svg"
          alt="Tennis Ball"
          className="w-24 h-24 mb-8"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to <span className="text-green-600">TennisCommunity</span>
          </h1>
          <p className="text-lg mb-8">
            🎾 Find players, challenge friends, and track your climb to the top.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" onClick={() => router.push('/login')}>
              Get Started
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/signup')}>
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </div>

      {/* Sections */}
      <section className="relative z-10 bg-white py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">🏆 Top Players</h2>
          <p className="text-gray-600 mb-8">
            See who’s leading the league based on wins, challenges, and activity!
          </p>
          {/* You can replace below with carousel component later */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map((i) => (
              <div key={i} className="p-6 bg-green-100 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold mb-2">Player {i}</h3>
                <p>Skill Level: {['4.0', '4.5', '5.0'][i%3]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 bg-gray-100 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">📋 How It Works</h2>
          <ol className="text-left text-lg space-y-4 max-w-2xl mx-auto">
            <li>1. Create your free account.</li>
            <li>2. Browse or challenge other players in your skill level.</li>
            <li>3. Play matches, report scores, and climb the leaderboard!</li>
          </ol>
        </div>
      </section>

      <section className="relative z-10 bg-green-600 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join?</h2>
          <p className="text-lg mb-8">Sign up today and become part of the best Tennis community online.</p>
          <Button size="lg" onClick={() => router.push('/signup')} variant="secondary">
            Join the League
          </Button>
        </div>
      </section>
    </div>
  );
}

