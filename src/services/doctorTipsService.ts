
import { supabase } from '@/lib/supabase';

// Types
export interface DoctorTip {
  id: string;
  title: string;
  description: string;
  author: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewDoctorTip {
  title: string;
  description: string;
  author?: string;
  image_url?: string | null;
}

// Get all doctor tips
export const getAllDoctorTips = async (): Promise<DoctorTip[]> => {
  try {
    const { data, error } = await supabase
      .from('doctor_tips')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching doctor tips:", error);
    return [];
  }
};

// Get a single doctor tip by ID
export const getDoctorTipById = async (id: string): Promise<DoctorTip | null> => {
  try {
    const { data, error } = await supabase
      .from('doctor_tips')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching doctor tip:", error);
    return null;
  }
};

// Create a new doctor tip
export const createDoctorTip = async (tip: NewDoctorTip): Promise<DoctorTip | null> => {
  try {
    const { data, error } = await supabase
      .from('doctor_tips')
      .insert(tip)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error creating doctor tip:", error);
    throw error;
  }
};

// Update an existing doctor tip
export const updateDoctorTip = async (id: string, updates: Partial<NewDoctorTip>): Promise<DoctorTip | null> => {
  try {
    // Add updated_at timestamp
    const updatedTip = {
      ...updates,
      updated_at: new Date().toISOString()
    };
    
    const { data, error } = await supabase
      .from('doctor_tips')
      .update(updatedTip)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error updating doctor tip:", error);
    throw error;
  }
};

// Delete a doctor tip
export const deleteDoctorTip = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('doctor_tips')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting doctor tip:", error);
    throw error;
  }
};

// Upload image for a doctor tip
export const uploadDoctorTipImage = async (file: File): Promise<string> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `doctor_tips/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('training')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('training')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  } catch (error) {
    console.error("Error uploading doctor tip image:", error);
    throw error;
  }
};
