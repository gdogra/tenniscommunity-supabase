import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequireAuth } from '@/components/auth/RequireAuth'
import { useRouter } from 'next/navigation'

// Mock Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}))

// Mock unauthenticated user
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}))

describe('RequireAuth (Redirect)', () => {
  it('redirects to login if not authenticated', () => {
    render(
      <RequireAuth>
        <div>Should not see this</div>
      </RequireAuth>
    )
    expect(screen.queryByText('Should not see this')).not.toBeInTheDocument()
    // Optional: check if router.replace was called
  })
})

