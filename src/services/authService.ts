import { supabase } from '@/lib/supabase';
import { AdminCredentials } from '@/types';

// Initialize admin account if it doesn't exist
export const initializeAdmin = async () => {
  try {
    // Check if admin_users table exists
    const { error: tableError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1)
      .single();
    
    // If table doesn't exist, we'll show a message to the user
    if (tableError && tableError.message.includes('does not exist')) {
      console.error("Admin users table doesn't exist. Please run the SQL script in Supabase SQL Editor.");
      return false;
    }

    // Check if admin user exists
    const { data: existingUsers, error } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', 'admin@gmail.com')
      .single();

    if (error && !error.message.includes('does not exist')) {
      console.error("Error checking admin:", error);
      return false;
    }

    if (!existingUsers) {
      // Create admin user in the custom table
      const { error } = await supabase
        .from('admin_users')
        .insert([
          { email: 'admin@gmail.com', password: 'admin@123', role: 'admin' }
        ]);

      if (error) throw error;
    }

    // Also ensure the admin exists in auth
    const { data: user, error: authError } = await supabase.auth.signUp({
      email: 'admin@gmail.com',
      password: 'admin@123',
    });

    if (authError && !authError.message.includes('already registered')) {
      throw authError;
    }

    return true;
  } catch (error) {
    console.error("Error initializing admin:", error);
    return false;
  }
};

export const adminLogin = async (credentials: AdminCredentials) => {
  try {
    // First check credentials against custom admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', credentials.email)
      .eq('password', credentials.password)
      .single();
    
    if (adminError) {
      if (adminError.message.includes('does not exist')) {
        throw new Error('Admin users table not found. Please set up the database.');
      } else {
        throw new Error('Invalid credentials');
      }
    }
    
    if (!adminUser) {
      throw new Error('Invalid credentials');
    }

    // If admin exists in custom table, sign in with Supabase auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password
    });
    
    if (error) {
      // If the user doesn't exist in Supabase Auth, create it
      if (error.message.includes('Invalid login credentials')) {
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: credentials.email,
          password: credentials.password
        });
        
        if (signUpError) throw signUpError;
        
        // Try login again after creating user
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        
        if (retryError) throw retryError;
        return retryData;
      } else {
        throw error;
      }
    }
    
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Invalid credentials');
  }
};

export const updateAdminCredentials = async (id: string, credentials: Partial<AdminCredentials>) => {
  try {
    // Update credentials in custom admin table
    const { error: adminTableError } = await supabase
      .from('admin_users')
      .update({
        email: credentials.email,
        password: credentials.password
      })
      .eq('id', id);

    if (adminTableError) throw adminTableError;
    
    // If password was changed, update in auth as well
    if (credentials.password) {
      const { error: authUpdateError } = await supabase.auth.updateUser({
        password: credentials.password
      });
      
      if (authUpdateError) throw authUpdateError;
    }
    
    // If email was changed, update in auth
    if (credentials.email) {
      const { error: emailUpdateError } = await supabase.auth.updateUser({
        email: credentials.email
      });
      
      if (emailUpdateError) throw emailUpdateError;
    }
    
    return true;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update credentials');
  }
};

export const getAdminProfile = async () => {
  try {
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      return null;
    }
    
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', session.session.user.email)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return null;
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
