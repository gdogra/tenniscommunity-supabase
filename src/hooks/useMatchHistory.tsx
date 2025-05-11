'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { supabase } from '@/lib/supabase';

export function useMatchHistory() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMatches = async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(`player1_id.eq.${user.id},player2_id.eq.${user.id}`);

      if (error) console.error(error.message);
      else setMatches(data || []);

      setLoading(false);
    };

    fetchMatches();
  }, [user]);

  return { matches, loading };
}

