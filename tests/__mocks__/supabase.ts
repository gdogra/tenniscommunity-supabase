// tests/__mocks__/supabase.ts

export const supabase = {
  auth: {
    getSession: vi.fn(() => Promise.resolve({ data: { session: null } })),
    onAuthStateChange: vi.fn(() => ({
      data: {
        subscription: {
          unsubscribe: vi.fn(),
        },
      },
    })),
    signInWithPassword: vi.fn(() => Promise.resolve({})),
    signOut: vi.fn(() => Promise.resolve({})),
  },
};

