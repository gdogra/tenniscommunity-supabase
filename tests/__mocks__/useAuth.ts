// tests/__mocks__/useAuth.ts
export default function useAuth() {
  return {
    user: null,
    login: vi.fn(),
    logout: vi.fn(),
  };
}

