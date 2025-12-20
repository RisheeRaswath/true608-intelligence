import { createClient } from '@supabase/supabase-js';

// --- EMERGENCY HARDCODED KEYS ---
// Note: We wrapped these in quotes "" to fix the errors.
const supabaseUrl = "https://vqwvtbayvbsxvryniquv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxd3Z0YmF5dmJzeHZyeW5pcXV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyNDU5NzUsImV4cCI6MjA4MTgyMTk3NX0.6X_NjCD9e4AVioM7271yCZb90DRBK6-XdVI_XIZgnMA";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("STARK ALERT: Supabase keys are missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);