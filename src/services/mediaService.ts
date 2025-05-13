
import { supabase } from '@/integrations/supabase/client';

// Instagram Reels
export const saveInstagramReel = async (reel: { url: string; title: string }) => {
  try {
    const { data, error } = await supabase
      .from('instagram_reels')
      .insert({
        url: reel.url,
        title: reel.title
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error saving Instagram reel:", error);
    throw error;
  }
};

export const getAllInstagramReels = async () => {
  try {
    const { data, error } = await supabase
      .from('instagram_reels')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching Instagram reels:", error);
    return [];
  }
};

export const deleteInstagramReel = async (id: string) => {
  try {
    const { error } = await supabase
      .from('instagram_reels')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting Instagram reel:", error);
    throw error;
  }
};

// Video Compression and Upload
export const uploadCompressedVideo = async ({
  file,
  title,
  compressionLevel,
  onProgress
}: {
  file: File;
  title: string;
  compressionLevel: string;
  onProgress?: (progress: number) => void;
}) => {
  try {
    // Simulate compression by waiting
    // In a real implementation, you'd use a library like FFmpeg.wasm
    const compressedSize = simulateCompression(file.size, compressionLevel);
    
    // Upload to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `compressed_videos/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('training')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('training')
      .getPublicUrl(filePath);
    
    // Save metadata to database
    const { data, error } = await supabase
      .from('compressed_videos')
      .insert({
        title,
        video_url: publicUrl,
        original_size: file.size,
        compressed_size: compressedSize,
        compression_level: compressionLevel
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      url: data.video_url,
      compressedSize: data.compressed_size
    };
  } catch (error) {
    console.error("Error uploading compressed video:", error);
    throw error;
  }
};

// Helper function to simulate compression
const simulateCompression = (originalSize: number, level: string) => {
  let compressionRate = 0.8; // Default medium (20% reduction)
  
  switch(level) {
    case 'low':
      compressionRate = 0.9; // 10% reduction
      break;
    case 'medium':
      compressionRate = 0.7; // 30% reduction
      break;
    case 'high':
      compressionRate = 0.5; // 50% reduction
      break;
  }
  
  return Math.floor(originalSize * compressionRate);
};

export const getAllCompressedVideos = async () => {
  try {
    const { data, error } = await supabase
      .from('compressed_videos')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching compressed videos:", error);
    return [];
  }
};

export const deleteCompressedVideo = async (id: string) => {
  try {
    // Get the video to find its file path
    const { data, error: fetchError } = await supabase
      .from('compressed_videos')
      .select('video_url')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Extract the path from the URL
    if (data.video_url) {
      const url = new URL(data.video_url);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('training')
        .remove([`compressed_videos/${fileName}`]);
      
      if (storageError) throw storageError;
    }
    
    // Delete from database
    const { error } = await supabase
      .from('compressed_videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting compressed video:", error);
    throw error;
  }
};

// Watermarked Images
export const uploadWatermarkedImage = async ({
  file,
  title,
  watermarkSettings
}: {
  file: File;
  title: string;
  watermarkSettings: any;
}) => {
  try {
    // Upload to Supabase storage
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `watermarked_images/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('training')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage
      .from('training')
      .getPublicUrl(filePath);
    
    // Save metadata to database
    const { data, error } = await supabase
      .from('watermarked_images')
      .insert({
        title,
        image_url: publicUrl,
        watermark_settings: watermarkSettings
      })
      .select()
      .single();
    
    if (error) throw error;
    
    return {
      id: data.id,
      title: data.title,
      url: data.image_url,
      watermarkSettings: data.watermark_settings
    };
  } catch (error) {
    console.error("Error uploading watermarked image:", error);
    throw error;
  }
};

export const getAllWatermarkedImages = async () => {
  try {
    const { data, error } = await supabase
      .from('watermarked_images')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data?.map(img => ({
      id: img.id,
      title: img.title,
      url: img.image_url,
      watermarkSettings: img.watermark_settings,
      createdAt: img.created_at
    })) || [];
  } catch (error) {
    console.error("Error fetching watermarked images:", error);
    return [];
  }
};

export const deleteWatermarkedImage = async (id: string) => {
  try {
    // Get the image to find its file path
    const { data, error: fetchError } = await supabase
      .from('watermarked_images')
      .select('image_url')
      .eq('id', id)
      .single();
    
    if (fetchError) throw fetchError;
    
    // Extract the path from the URL
    if (data.image_url) {
      const url = new URL(data.image_url);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('training')
        .remove([`watermarked_images/${fileName}`]);
      
      if (storageError) console.error("Storage removal error:", storageError);
    }
    
    // Delete from database
    const { error } = await supabase
      .from('watermarked_images')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    console.error("Error deleting watermarked image:", error);
    throw error;
  }
};
