
import { supabase } from '@/lib/supabase';
import { AdminCredentials } from '@/types';

export const adminLogin = async (credentials: AdminCredentials) => {
  // Hardcoded admin credentials as requested
  const hardcodedCredentials = {
    email: 'admin@gmail.com',
    password: 'admin@123'
  };

  // Check if credentials match hardcoded values
  if (credentials.email === hardcodedCredentials.email && 
      credentials.password === hardcodedCredentials.password) {
    
    // Use Supabase auth to sign in and maintain session
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    
    if (error) throw error;
    return data;
  } else {
    throw new Error('Invalid credentials');
  }
};

export const adminLogout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return true;
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};
