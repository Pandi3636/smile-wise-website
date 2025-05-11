
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "@/components/AdminNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { createVideo, uploadVideo } from "@/services/videoService";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  video_url: z.string().url("Please enter a valid URL").or(z.string().length(0)),
});

type FileState = {
  file: File | null;
  preview: string | null;
  uploading: boolean;
};

const AdminAddVideoPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [fileState, setFileState] = useState<FileState>({
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      let videoUrl = values.video_url;
      
      // If there's a file upload, upload it to Supabase storage
      if (fileState.file) {
        setFileState((prev) => ({ ...prev, uploading: true }));
        videoUrl = await uploadVideo(fileState.file);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="pt-24 pb-16 container mx-auto px-4">
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
      </div>
    </div>
  );
};

export default AdminAddVideoPage;
