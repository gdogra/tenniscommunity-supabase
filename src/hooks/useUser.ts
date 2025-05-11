// src/hooks/useUser.ts
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Session } from '@supabase/supabase-js'

export function useUser() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session),
    )
    return () => listener.subscription.unsubscribe()
  }, [])

  return { session, user: session?.user }
}

