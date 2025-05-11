
export interface TrainingVideo {
  id: string;
  title: string;
  video_url: string;
  created_at: string;
  thumbnail?: string;
  category_id?: string;
}

export interface AdminCredentials {
  email: string;
  password: string;
}
