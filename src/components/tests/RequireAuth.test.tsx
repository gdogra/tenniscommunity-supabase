import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RequireAuth from '@/components/auth/RequireAuth';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  default: () => ({
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe('RequireAuth', () => {
  it('redirects to login if not authenticated', () => {
    render(<RequireAuth><div>Protected Content</div></RequireAuth>);
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('renders children when authenticated', () => {
    vi.mock('@/hooks/useAuth', () => ({
      default: () => ({
        user: { id: 'mock-user-id', email: 'mock@example.com' },
        login: vi.fn(),
        logout: vi.fn(),
      }),
    }));

    render(<RequireAuth><div>Protected Content</div></RequireAuth>);
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });
});

