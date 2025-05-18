
export interface TrainingVideo {
  id: string;
  title: string;
  video_url: string;
  created_at: string;
  thumbnail?: string;
  category_id?: any;
  description?: string;
  video: any;
}

export interface AdminCredentials {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
}
