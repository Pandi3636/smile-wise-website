
import { supabase } from '@/integrations/supabase/client';
import { TrainingVideo } from '@/types';

export const getAllVideos = async (): Promise<TrainingVideo[]> => {
  try {
    const { data, error } = await supabase
      .from('training_videos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};

export const getVideoById = async (id: string): Promise<TrainingVideo | null> => {
  try {
    const { data, error } = await supabase
      .from('training_videos')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
};

export const uploadVideo = async (file: File) => {
  try {
    // Check if storage bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const trainingBucket = buckets?.find(bucket => bucket.name === 'training');
    
    if (!trainingBucket) {
      // Create bucket if it doesn't exist
      const { error: bucketError } = await supabase.storage.createBucket('training', {
        public: true
      });
      if (bucketError) throw bucketError;
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('training')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('training')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading video:", error);
    throw error;
  }
};

export const uploadThumbnail = async (file: File) => {
  try {
    // Check if storage bucket exists
    const { data: buckets } = await supabase.storage.listBuckets();
    const trainingBucket = buckets?.find(bucket => bucket.name === 'training');
    
    if (!trainingBucket) {
      // Create bucket if it doesn't exist
      const { error: bucketError } = await supabase.storage.createBucket('training', {
        public: true
      });
      if (bucketError) throw bucketError;
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `thumbnails/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('training')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('training')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading thumbnail:", error);
    throw error;
  }
};

// Fix: Update parameter type to ensure required fields are present
export const createVideo = async (video: { title: string; video_url: string } & Partial<TrainingVideo>) => {
  try {
    const { data, error } = await supabase
      .from('training_videos')
      .insert(video)
      .select();

    if (error) throw error;
    return data?.[0];
  } catch (error) {
    console.error("Error creating video:", error);
    throw error;
  }
};

export const updateVideo = async (id: string, video: Partial<TrainingVideo>) => {
  const { data, error } = await supabase
    .from('training_videos')
    .update(video)
    .eq('id', id)
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
