import { renderHook } from '@testing-library/react'
import { useUser } from '@/hooks/useUser'

describe('useUser', () => {
  it('should return null user initially', () => {
    const { result } = renderHook(() => useUser())
    expect(result.current.user).toBeNull()
  })
})

