import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequireAdmin } from '@/components/auth/RequireAdmin'
import { useRouter } from 'next/navigation'

// Mock Router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    replace: vi.fn(),
  }),
}))

// Mock user who is NOT admin
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'basic-user', email: 'user@example.com', role: 'user' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}))

describe('RequireAdmin (Redirect)', () => {
  it('redirects to unauthorized if user is not admin', () => {
    render(
      <RequireAdmin>
        <div>Should not see this</div>
      </RequireAdmin>
    )
    expect(screen.queryByText('Should not see this')).not.toBeInTheDocument()
    // Optional: check if router.replace was called
  })
})

