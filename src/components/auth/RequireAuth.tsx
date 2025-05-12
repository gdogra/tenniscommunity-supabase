"use client"

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.replace('/unauthorized')
    }
  }, [user, router])

  if (!user || user.role !== 'admin') return null

  return <>{children}</>
}

