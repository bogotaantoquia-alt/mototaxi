import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fyplbgjlvysbecxqxeya.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5cGxiZ2psdnlzYmVjeHF4ZXlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0NTYxNTQsImV4cCI6MjA5NDAzMjE1NH0.FgO5T_x91u4582k3dRyg4e7sirsTBKssGkKEoNRO_zo';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
