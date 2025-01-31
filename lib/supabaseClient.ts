import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing env vars NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_KEY",
  );
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);
