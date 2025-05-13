import { User } from '@supabase/supabase-js';

export interface AppUser extends User {
  user_metadata?: {
    is_admin?: boolean;
    [key: string]: any;
  };
}

