import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zfujyjgquhpplhnakebo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmdWp5amdxdWhwcGxobmFrZWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxODMxMzksImV4cCI6MjA5Nzc1OTEzOX0.QB4a5zvqc8NfAMGVtpiNHaLKU7s7KD1W16J-Te0lAPU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkServices() {
  const { data, error } = await supabase.from('services').select('*');
  console.log("Services in DB:", data);
  console.error("Error:", error);
}

checkServices();
