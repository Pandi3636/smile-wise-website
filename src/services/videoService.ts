
import { supabase } from '@/lib/supabase';
import { TrainingVideo } from '@/types';

export const getAllVideos = async (): Promise<TrainingVideo[]> => {
  const { data, error } = await supabase
    .from('training_videos')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const uploadVideo = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `videos/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('training')
    .upload(filePath, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('training')
    .getPublicUrl(filePath);
  
  return publicUrl;
};

export const createVideo = async (video: Partial<TrainingVideo>) => {
  const { data, error } = await supabase
    .from('training_videos')
    .insert([video])
    .select();

  if (error) throw error;
  return data?.[0];
};

export const deleteVideo = async (id: string) => {
  const { data, error } = await supabase
    .from('training_videos')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return data;
};
