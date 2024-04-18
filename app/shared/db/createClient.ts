import { createClient as _createClient } from '@supabase/supabase-js';
import { Database } from '~/shared/db/types/database.types';

export const createClient = () => {
  return _createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!);
};
