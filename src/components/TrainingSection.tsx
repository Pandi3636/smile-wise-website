
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllVideos } from "@/services/videoService";
import { TrainingVideo } from "@/types";
import { useToast } from "@/components/ui/use-toast";


const TrainingSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    url: string;
    description?: string;
  }>(null);
  const [videos, setVideos] = useState<TrainingVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

const [activeTab, setActiveTab] = useState<string | null>(null);

useEffect(() => {
  const fetchVideos = async () => {
    try {
      setLoading(true);
      const data = await getAllVideos();
      setVideos(data);

      if (data.length > 0) {
        const firstCategory = data[0].category_id || "Full Mouth Rehabilitation";
        setActiveTab(firstCategory);
      }
    } catch (error: any) {
      console.error("Error fetching videos:", error);
      toast({
        title: "Error loading videos",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  fetchVideos();
}, [toast]);

const videosByCategory = videos.reduce((acc: Record<string, any[]>, video) => {
  const categoryId = video.category_id || 'Full Mouth Rehabilitation'; // this is the category name here
  if (!acc[categoryId]) acc[categoryId] = [];

  acc[categoryId].push({
    id: video.id,
    title: video.title,
    description: video.description || "",
    thumbnail: video.thumbnail || "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1173&auto=format&fit=crop",
    url: video.video_url,
    duration: "3:45",
  });

  return acc;
}, {});


  // Initialize empty arrays for categories without videos

  return (
    <section id="training" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Dental Training Videos
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive educational resources organized by dental specialty to help you better understand various dental procedures, treatments, and care tips.
          </p>
          {/* Admin link section */}
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link to="/admin-login">Administrator Access</Link>
            </Button>
          </div>
        </div>

<Tabs value={activeTab ?? ""} onValueChange={setActiveTab} className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
             {Object.entries(videosByCategory).map(([category]) => (
              <TabsTrigger key={category} value={category}>
                {category} 
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(videosByCategory).map(([category, categoryVideos]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">Loading videos...</p>
                  </div>
                ) : categoryVideos.length > 0 ? (
                  categoryVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div
                        className="relative h-44 overflow-hidden"
                        onClick={() => setSelectedVideo({
                          title: video.title,
                          url: video.url,
                          description: video.description
                        })}
                      >
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white bg-opacity-80 flex items-center justify-center">
                            <Video className="w-8 h-8 text-dental-blue" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium text-lg">{video.title}</h3>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No videos available in this category</p>
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
              <div className="p-4 flex justify-between items-center border-b">
                <h3 className="font-medium text-lg">{selectedVideo.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedVideo(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </Button>
              </div>
              <div className="aspect-video">
                <video
                  src={selectedVideo.url}
                  controls
                  className="w-full h-full"
                />
              </div>
              {selectedVideo.description && (
                <div className="p-4 border-t">
                  <p className="text-gray-700">{selectedVideo.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingSection;
