import { renderHook } from '@testing-library/react'
import { useUser } from '@/hooks/useUser'

describe('useUser hook', () => {
  it('returns user as null initially', () => {
    const { result } = renderHook(() => useUser())
    expect(result.current.user).toBeNull()
  })
})

