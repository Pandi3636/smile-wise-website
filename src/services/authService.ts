
import { supabase } from '@/integrations/supabase/client';
import { AdminCredentials } from '@/types';

export const initializeAdmin = async () => {
  try {
    // Check if admin_users table exists by trying to query it
    const { error: tableError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1)
      .single();
    
    // If table doesn't exist, the SQL above might not have worked
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

    if (error && !error.message.includes('No rows found') && !error.message.includes('does not exist')) {
      console.error("Error checking admin:", error);
      return false;
    }

    if (!existingUsers) {
      // Create admin user in the custom table
      const { error: insertError } = await supabase
        .from('admin_users')
        .insert([
          { email: 'admin@gmail.com', password: 'Password@123', role: 'admin' }
        ]);

      if (insertError) {
        console.error("Error inserting admin user:", insertError);
        return false;
      }
    }

    // Also ensure the admin exists in auth
    const { data: user, error: authError } = await supabase.auth.signUp({
      email: 'admin@gmail.com',
      password: 'Password@123',
    });

    if (authError && !authError.message.includes('already registered')) {
      console.error("Error creating auth user:", authError);
      return false;
    }

    // Check if the training bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const trainingBucket = buckets?.find(bucket => bucket.name === 'training');
    
    if (!trainingBucket) {
      const { error: bucketError } = await supabase.storage.createBucket('training', {
        public: true
      });
      
      if (bucketError) {
        console.error("Error creating training bucket:", bucketError);
      }
    }

    // Insert default categories if they don't exist
    const defaultCategories = [
      { id: 'general', name: 'General Dentistry' },
      { id: 'cosmetic', name: 'Cosmetic Dentistry' },
      { id: 'pediatric', name: 'Pediatric Dentistry' },
      { id: 'orthodontics', name: 'Orthodontics' },
      { id: 'oral-surgery', name: 'Oral Surgery' },
      { id: 'endodontics', name: 'Endodontics' }
    ];
    
    // Insert categories one by one with error handling for each
    for (const category of defaultCategories) {
      const { error: checkError, data: existingCategory } = await supabase
        .from('categories')
        .select('id')
        .eq('id', category.id)
        .maybeSingle();
        
      if (!existingCategory && !checkError) {
        const { error: insertError } = await supabase
          .from('categories')
          .insert([category]);
          
        if (insertError) {
          console.error(`Error inserting category ${category.id}:`, insertError);
        }
      }
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
      if (adminError.message.includes('No rows found')) {
        throw new Error('Invalid credentials. Please try again.');
      }
      if (adminError.message.includes('does not exist')) {
        throw new Error('Admin users table not found. Please set up the database.');
      } else {
        console.error("Admin check error:", adminError);
        throw new Error('Authentication error. Please try again.');
      }
    }
    
    if (!adminUser) {
      throw new Error('Invalid credentials. Please try again.');
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
        
        if (signUpError) {
          console.error("Sign up error:", signUpError);
          throw new Error('Failed to create authentication account.');
        }
        
        // Try login again after creating user
        const { data: retryData, error: retryError } = await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password
        });
        
        if (retryError) {
          console.error("Retry login error:", retryError);
          throw new Error('Login failed after account creation.');
        }
        return { ...retryData, admin: adminUser };
      } else {
        console.error("Auth error:", error);
        throw new Error('Authentication failed. Please try again.');
      }
    }
    
    return { ...data, admin: adminUser };
  } catch (error: any) {
    console.error("Login error:", error);
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
