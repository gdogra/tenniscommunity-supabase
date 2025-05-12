// tests/__mocks__/useAuthAdmin.ts

export const useAuth = () => ({
  user: { id: 'admin-user-id', role: 'admin' },
  login: vi.fn(),
  logout: vi.fn(),
});

