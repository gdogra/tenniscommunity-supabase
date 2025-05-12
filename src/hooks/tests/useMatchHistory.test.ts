import { renderHook } from '@testing-library/react'
import { useMatchHistory } from '@/hooks/useMatchHistory'

describe('useMatchHistory hook', () => {
  it('should start with empty match history', () => {
    const { result } = renderHook(() => useMatchHistory())
    expect(result.current.matches).toEqual([])
  })
})

