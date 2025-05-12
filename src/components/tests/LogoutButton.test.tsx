import { render, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import LogoutButton from '@/components/LogoutButton';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock('@/hooks/useAuth', () => ({
  default: () => ({
    user: { id: 'mock-user-id', email: 'mock@example.com' },
    login: vi.fn(),
    logout: vi.fn(),
  }),
}));

describe('LogoutButton', () => {
  it('should render button and allow click', () => {
    const { getByRole } = render(<LogoutButton />);
    const button = getByRole('button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
  });
});

