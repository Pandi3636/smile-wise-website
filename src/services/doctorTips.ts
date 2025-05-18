import { supabase } from '../integrations/supabase/client';
import { Tables } from '../integrations/supabase/types';

export type DoctorTip = Tables<'doctor_tips'>;

export const doctorTipsService = {
  async getAllTips(): Promise<DoctorTip[]> {
    const { data, error } = await supabase
      .from('doctor_tips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  },

  async getTipById(id: string): Promise<DoctorTip | null> {
    const { data, error } = await supabase
      .from('doctor_tips')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}; 