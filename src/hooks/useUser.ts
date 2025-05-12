'use client';

import { useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState<null | { id: string; email: string }>(null);

  return { user };
}

