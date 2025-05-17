
-- Create admin_users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_videos table
CREATE TABLE IF NOT EXISTS public.training_videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  description TEXT,
  category_id VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Create doctor_tips table
CREATE TABLE IF NOT EXISTS public.doctor_tips (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  author TEXT NOT NULL DEFAULT 'Dr. Prabha',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert initial admin user
INSERT INTO public.admin_users (email, password, role)
VALUES ('admin@gmail.com', 'admin@123', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Insert default categories
INSERT INTO public.categories (id, name)
VALUES 
  ('general', 'General Dentistry'),
  ('cosmetic', 'Cosmetic Dentistry'),
  ('pediatric', 'Pediatric Dentistry'),
  ('orthodontics', 'Orthodontics'),
  ('oral-surgery', 'Oral Surgery'),
  ('endodontics', 'Endodontics')
ON CONFLICT (id) DO NOTHING;
