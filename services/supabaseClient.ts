import { createClient } from '@supabase/supabase-js';

// Env vars are preferred, but fallback to hardcoded values for deployment.
// The anon key is safe to embed — it's a public key, protected by RLS policies.
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://xzsuppwnbrwqdfvnudok.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6c3VwcHduYnJ3cWRmdm51ZG9rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNTM2ODgsImV4cCI6MjA5NjcyOTY4OH0.APIbBrcG41DOi8ZQJZPIvJe1kv6eBiBRv6Ly237n4us';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
