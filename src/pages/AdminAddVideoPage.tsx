
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createVideo, uploadVideo, uploadThumbnail } from "@/services/videoService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AdminLayout from "@/components/AdminLayout";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  video_url: z.string().url("Please enter a valid URL").or(z.string().length(0)),
  description: z.string().optional(),
  category_id: z.string().optional(),
});

type FileState = {
  file: File | null;
  preview: string | null;
  uploading: boolean;
};

const categories = [
  { id: "general", name: "General Dentistry" },
  { id: "cosmetic", name: "Cosmetic Dentistry" },
  { id: "pediatric", name: "Pediatric Dentistry" },
  { id: "orthodontics", name: "Orthodontics" },
  { id: "oral-surgery", name: "Oral Surgery" },
  { id: "endodontics", name: "Endodontics" }
];

const AdminAddVideoPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    preview: null,
    uploading: false,
  });
  const [thumbnailState, setThumbnailState] = useState<FileState>({
    file: null,
    preview: null, 
    uploading: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      video_url: "",
      description: "",
      category_id: "general",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      let videoUrl = values.video_url;
      let thumbnailUrl = null;
      
      // If there's a file upload, upload it to Supabase storage
      if (fileState.file) {
        setFileState((prev) => ({ ...prev, uploading: true }));
        videoUrl = await uploadVideo(fileState.file);
      }
      
      // Upload thumbnail if provided
      if (thumbnailState.file) {
        setThumbnailState((prev) => ({ ...prev, uploading: true }));
        thumbnailUrl = await uploadThumbnail(thumbnailState.file);
      }
      
      // If no URL provided and no file uploaded, show error
      if (!videoUrl && !fileState.file) {
        toast({
          title: "Error",
          description: "Please provide either a video URL or upload a file",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Create video in database
      await createVideo({
        title: values.title,
        video_url: videoUrl,
        thumbnail: thumbnailUrl || undefined,
        description: values.description,
        category_id: values.category_id,
      });
      
      toast({
        title: "Success",
        description: "Video added successfully",
      });
      
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add video",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      if (fileState.file) {
        setFileState((prev) => ({ ...prev, uploading: false }));
      }
      if (thumbnailState.file) {
        setThumbnailState((prev) => ({ ...prev, uploading: false }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type: Accept only video files
    if (!file.type.startsWith("video/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file (MP4, WEBM, etc.)",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setFileState({
      file,
      preview: previewUrl,
      uploading: false,
    });
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type: Accept only image files
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file for thumbnail",
        variant: "destructive",
      });
      return;
    }
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    
    setThumbnailState({
      file,
      preview: previewUrl,
      uploading: false,
    });
  };

  const clearFileSelection = () => {
    if (fileState.preview) {
      URL.revokeObjectURL(fileState.preview);
    }
    setFileState({
      file: null,
      preview: null,
      uploading: false,
    });
  };

  const clearThumbnailSelection = () => {
    if (thumbnailState.preview) {
      URL.revokeObjectURL(thumbnailState.preview);
    }
    setThumbnailState({
      file: null,
      preview: null,
      uploading: false,
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Add New Training Video</CardTitle>
            <CardDescription>Upload a new training video or provide a YouTube link</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter video title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter video description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="category_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid gap-6">
                  <div>
                    <FormField
                      control={form.control}
                      name="video_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Video URL (YouTube or other)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://www.youtube.com/watch?v=..." 
                              {...field}
                              disabled={!!fileState.file}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-sm text-gray-500 mt-1">Or</p>
                  </div>
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <div className="text-center">
                      <div className="mt-2">
                        {!fileState.file ? (
                          <div className="flex flex-col items-center">
                            <label 
                              htmlFor="video-upload" 
                              className="cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md border text-sm"
                            >
                              Upload Video
                            </label>
                            <Input
                              id="video-upload"
                              type="file"
                              accept="video/*"
                              className="hidden"
                              onChange={handleFileChange}
                              disabled={isSubmitting}
                            />
                            <p className="text-xs text-gray-500 mt-2">
                              Supported formats: MP4, WEBM (max 100MB)
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-medium mb-2">Selected file: {fileState.file.name}</p>
                            {fileState.preview && (
                              <div className="mb-2">
                                <video 
                                  src={fileState.preview} 
                                  controls 
                                  className="mx-auto max-h-48"
                                ></video>
                              </div>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              type="button" 
                              onClick={clearFileSelection}
                              disabled={isSubmitting}
                            >
                              Remove
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border border-dashed border-gray-300 rounded-lg p-4">
                    <FormLabel>Thumbnail Image</FormLabel>
                    <div className="text-center mt-2">
                      {!thumbnailState.file ? (
                        <div className="flex flex-col items-center">
                          <label 
                            htmlFor="thumbnail-upload" 
                            className="cursor-pointer bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-md border text-sm"
                          >
                            Upload Thumbnail
                          </label>
                          <Input
                            id="thumbnail-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleThumbnailChange}
                            disabled={isSubmitting}
                          />
                          <p className="text-xs text-gray-500 mt-2">
                            Recommended: 16:9 ratio, JPG or PNG
                          </p>
                        </div>
                      ) : (
                        <div>
                          <div className="mb-2">
                            <img 
                              src={thumbnailState.preview!} 
                              alt="Thumbnail preview" 
                              className="mx-auto max-h-48 object-cover rounded"
                            />
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            type="button" 
                            onClick={clearThumbnailSelection}
                            disabled={isSubmitting}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button 
                    variant="outline" 
                    type="button" 
                    onClick={() => navigate("/admin/dashboard")}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || fileState.uploading}
                  >
                    {isSubmitting ? "Adding Video..." : "Add Video"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminAddVideoPage;
