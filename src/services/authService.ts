
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
    console.log("Login attempt with credentials:", credentials.email);
    
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

    // Using custom sessions for admin users
    // Store admin session in localStorage
    localStorage.setItem('adminSession', JSON.stringify({
      user: adminUser,
      timestamp: new Date().toISOString()
    }));
    
    return { admin: adminUser };
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
    
    return true;
  } catch (error: any) {
    throw new Error(error.message || 'Failed to update credentials');
  }
};

export const getAdminProfile = async () => {
  try {
    // Get from localStorage instead of auth session
    const adminSessionStr = localStorage.getItem('adminSession');
    
    if (!adminSessionStr) {
      return null;
    }
    
    const adminSession = JSON.parse(adminSessionStr);
    return adminSession.user;
  } catch (error) {
    console.error("Error fetching admin profile:", error);
    return null;
  }
};

export const adminLogout = async () => {
  // Clear admin session from localStorage
  localStorage.removeItem('adminSession');
  return true;
};

export const getCurrentUser = async () => {
  const adminSessionStr = localStorage.getItem('adminSession');
  if (!adminSessionStr) {
    return null;
  }
  
  const adminSession = JSON.parse(adminSessionStr);
  return adminSession.user;
};

export const getSession = async () => {
  const adminSessionStr = localStorage.getItem('adminSession');
  if (!adminSessionStr) {
    return null;
  }
  
  return { user: JSON.parse(adminSessionStr).user };
};
