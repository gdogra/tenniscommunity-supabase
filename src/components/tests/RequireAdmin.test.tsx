import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RequireAdmin } from '@/components/auth/RequireAdmin'

// Mock useAuth with an Admin user
vi.mock('@/hooks/useAuth', () => require('../../../tests/__mocks__/useAuthAdmin'))

describe('RequireAdmin', () => {
  it('renders children if user is admin', () => {
    render(
      <RequireAdmin>
        <div>Admin Content</div>
      </RequireAdmin>
    )
    expect(screen.getByText('Admin Content')).toBeInTheDocument()
  })
})

