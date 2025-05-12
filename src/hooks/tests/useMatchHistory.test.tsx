import { renderHook } from '@testing-library/react'
import { useMatchHistory } from '@/hooks/useMatchHistory'

describe('useMatchHistory', () => {
  it('should start with empty matches array', () => {
    const { result } = renderHook(() => useMatchHistory())
    expect(result.current.matches).toEqual([])
  })
})

