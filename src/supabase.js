
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://urmusrqzigbyhhxfzvpj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybXVzcnF6aWdieWhoeGZ6dnBqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI0ODg2ODQsImV4cCI6MTk4ODA2NDY4NH0.Rwh2YpbaGBJN4Lkug1Vc5CifHDSzNaCilf9MT752EK8';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;