import { vi } from 'vitest';

// Mock supabase client
vi.mock('@/lib/supabase', async () => {
  return await import('./tests/__mocks__/supabase');
});

import '@testing-library/jest-dom'
