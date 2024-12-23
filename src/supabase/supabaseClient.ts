import { createClient } from '@supabase/supabase-js';

// Replace these values with your Supabase project credentials
const supabaseUrl = 'https://uflhcbhqohcjghxuweel.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY


export const supabase = createClient(supabaseUrl, supabaseKey as any);
