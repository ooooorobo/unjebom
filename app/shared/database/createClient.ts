import { createClient } from '@supabase/supabase-js';

const createDBClient = () => {
  createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLIC_KEY!);
};