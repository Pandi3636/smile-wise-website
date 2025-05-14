
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import { 
  getAllVideos, 
  uploadVideo, 
  uploadThumbnail, 
  createVideo, 
  deleteVideo 
} from "@/services/videoService";
import { Trash, Upload, Eye } from "lucide-react";
import { TrainingVideo } from "@/types";

const TrainingVideosSection = () => {
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const fetchedVideos = await getAllVideos();
      setVideos(fetchedVideos);
    } catch (error: any) {
      toast({
        title: "Error fetching videos",
        description: error.message || "Failed to fetch training videos",
        variant: "destructive",
      });
    }
  };
  
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedVideo(file);
        
        // Generate preview
        const videoURL = URL.createObjectURL(file);
        setVideoPreview(videoURL);
        
        // Auto-generate title from filename if title is not set
        if (!title) {
          setTitle(file.name.split('.')[0]);
        }
      } else {
        toast({
          title: "Invalid file",
          description: "Please select a video file",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedThumbnail(file);
        
        // Generate preview
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Invalid file",
          description: "Please select an image file for the thumbnail",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedVideo) {
      toast({
        title: "No video selected",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (!title) {
      toast({
        title: "Title required",
        description: "Please enter a title for the video",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadProgress(10);
      
      // Upload video
      const videoUrl = await uploadVideo(selectedVideo);
      setUploadProgress(70);
      
      // Upload thumbnail if selected
      let thumbnailUrl = null;
      if (selectedThumbnail) {
        thumbnailUrl = await uploadThumbnail(selectedThumbnail);
      }
      
      setUploadProgress(90);
      
      // Create video in database
      const videoData = {
        title: title,
        video_url: videoUrl,
        thumbnail: thumbnailUrl,
        description: description || undefined,
        category_id: category || undefined
      };
      
      const newVideo = await createVideo(videoData);
      setUploadProgress(100);
      
      // Add the new video to the list
      setVideos([newVideo, ...videos]);
      
      // Reset form
      resetForm();
      
      toast({
        title: "Success",
        description: "Training video uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };
  
  const handleDeleteVideo = async (id: string) => {
    if (confirm("Are you sure you want to delete this video?")) {
      try {
        await deleteVideo(id);
        setVideos(videos.filter(video => video.id !== id));
        toast({
          title: "Success",
          description: "Video deleted successfully",
        });
      } catch (error: any) {
        toast({
          title: "Delete failed",
          description: error.message || "Failed to delete video",
          variant: "destructive",
        });
      }
    }
  };
  
  const resetForm = () => {
    setSelectedVideo(null);
    setSelectedThumbnail(null);
    setVideoPreview(null);
    setThumbnailPreview(null);
    setTitle("");
    setDescription("");
    setCategory("");
    
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
    
    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="video-title">Video Title</Label>
            <Input 
              id="video-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video-description">Description (Optional)</Label>
            <Textarea 
              id="video-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video-category">Category (Optional)</Label>
            <Input 
              id="video-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Video category"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video-upload">Select Video</Label>
            <Input
              ref={videoInputRef}
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleVideoSelect}
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500">
              Max file size: 100MB. Supported formats: MP4, WebM, MOV
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="thumbnail-upload">Thumbnail (Optional)</Label>
            <Input
              ref={thumbnailInputRef}
              id="thumbnail-upload"
              type="file"
              accept="image/*"
              onChange={handleThumbnailSelect}
              disabled={isUploading}
            />
            <p className="text-xs text-gray-500">
              Recommended size: 1280×720. Supported formats: JPG, PNG
            </p>
          </div>
          
          <Button
            onClick={handleUpload}
            disabled={!selectedVideo || isUploading || !title}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? `Uploading... ${uploadProgress}%` : "Upload Training Video"}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h4 className="font-medium">Preview</h4>
          
          <div className="border rounded-md overflow-hidden bg-gray-50">
            {videoPreview ? (
              <video
                src={videoPreview}
                controls
                className="w-full h-auto"
                style={{ maxHeight: "250px" }}
              />
            ) : (
              <div className="flex items-center justify-center h-64 text-sm text-gray-500">
                Upload a video to preview
              </div>
            )}
          </div>
          
          {thumbnailPreview && (
            <div>
              <h4 className="font-medium mb-2">Thumbnail Preview</h4>
              <div className="border rounded-md overflow-hidden">
                <img 
                  src={thumbnailPreview} 
                  alt="Thumbnail preview" 
                  className="w-full h-auto" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Training Videos</h3>
        
        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => (
              <Card key={video.id}>
                <CardContent className="p-4">
                  <div className="aspect-video bg-black rounded-md overflow-hidden mb-2">
                    {video.thumbnail ? (
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Eye className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <h4 className="font-medium truncate">{video.title}</h4>
                  {video.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{video.description}</p>
                  )}
                  <p className="text-xs text-gray-500 mb-3">
                    {new Date(video.created_at).toLocaleDateString()}
                  </p>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <a href={video.video_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" /> View
                      </a>
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDeleteVideo(video.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 bg-gray-50 text-sm text-gray-500 rounded-lg border border-dashed">
            No training videos yet
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingVideosSection;
