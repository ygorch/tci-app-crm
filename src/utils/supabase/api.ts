import { createClient } from '@supabase/supabase-js';

// This client is specifically for server-side API routes that need admin privileges.
// It uses the SERVICE_ROLE_KEY for authentication, bypassing RLS.
// Use with extreme caution.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase URL or Service Role Key are not defined in environment variables.');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
