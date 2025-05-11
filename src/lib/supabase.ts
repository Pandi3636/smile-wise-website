
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://upkmrcbkrsfwejwepiqa.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwa21yY2JrcnNmd2Vqd2VwaXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5Njc5MTksImV4cCI6MjA2MjU0MzkxOX0.eBtm8-uxPgCwtFfWn6cXibH36BUR5sFJzqyCISKc9IM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
