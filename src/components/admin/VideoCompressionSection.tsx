
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { uploadCompressedVideo } from "@/services/mediaService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trash as Trash, upload as Upload, eye as Eye } from "lucide-react";

type CompressedVideo = {
  id: string;
  title: string;
  url: string;
  originalSize: number;
  compressedSize: number;
  createdAt: string;
};

const VideoCompressionSection = () => {
  const [videos, setVideos] = useState<CompressedVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [compressionLevel, setCompressionLevel] = useState("medium");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedVideo(file);
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
  
  const handleUpload = async () => {
    if (!selectedVideo) {
      toast({
        title: "No video selected",
        description: "Please select a video to upload",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      setProgress(0);
      
      // Simulate compression progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 500);
      
      const result = await uploadCompressedVideo({
        file: selectedVideo,
        title: title || selectedVideo.name,
        compressionLevel,
        onProgress: (progress) => setProgress(progress)
      });
      
      clearInterval(progressInterval);
      setProgress(100);
      
      // Add the new video to the list
      setVideos([
        {
          id: result.id,
          title: result.title,
          url: result.url,
          originalSize: selectedVideo.size,
          compressedSize: result.compressedSize,
          createdAt: new Date().toISOString(),
        },
        ...videos
      ]);
      
      // Reset form
      setSelectedVideo(null);
      setTitle("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "Success",
        description: "Video compressed and uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload video",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };
  
  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  
  const calculateCompressionRate = (original: number, compressed: number) => {
    const rate = ((original - compressed) / original) * 100;
    return rate.toFixed(2) + "%";
  };
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
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
            <Label htmlFor="compression-level">Compression Level</Label>
            <select 
              id="compression-level"
              value={compressionLevel}
              onChange={(e) => setCompressionLevel(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="low">Low (Better Quality)</option>
              <option value="medium">Medium (Balanced)</option>
              <option value="high">High (Smaller Size)</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video-upload">Select Video</Label>
            <Input
              ref={fileInputRef}
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
          
          {selectedVideo && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <p className="font-medium">{selectedVideo.name}</p>
              <p className="text-sm text-gray-500">
                Size: {formatFileSize(selectedVideo.size)}
              </p>
              {selectedVideo.type && (
                <p className="text-sm text-gray-500">
                  Type: {selectedVideo.type}
                </p>
              )}
            </div>
          )}
          
          {isUploading && (
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-center">
                {progress < 100 ? "Compressing & uploading..." : "Processing..."} {progress}%
              </p>
            </div>
          )}
          
          <Button
            onClick={handleUpload}
            disabled={!selectedVideo || isUploading}
            className="w-full"
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Compress & Upload"}
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Compressed Videos</h3>
          
          {videos.length > 0 ? (
            <div className="border rounded-md overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Original Size</TableHead>
                    <TableHead>Compressed Size</TableHead>
                    <TableHead>Reduction</TableHead>
                    <TableHead>Created At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {videos.map((video) => (
                    <TableRow key={video.id}>
                      <TableCell className="font-medium">{video.title}</TableCell>
                      <TableCell>{formatFileSize(video.originalSize)}</TableCell>
                      <TableCell>{formatFileSize(video.compressedSize)}</TableCell>
                      <TableCell>{calculateCompressionRate(video.originalSize, video.compressedSize)}</TableCell>
                      <TableCell>{new Date(video.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={video.url} target="_blank" rel="noopener noreferrer">
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleRemoveVideo(video.id)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 bg-gray-100 text-sm text-gray-500 rounded-lg">
              No compressed videos yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCompressionSection;
