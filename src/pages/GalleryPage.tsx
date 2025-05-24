
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getAllWatermarkedImages } from "@/services/mediaService";
import { getAllVideos } from "@/services/videoService";
import { Image, Video } from "lucide-react";

const GalleryPage = () => {
  const [activeTab, setActiveTab] = useState<"images" | "videos" | "all">("images");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchMedia = async () => {
      setIsLoading(true);
      try {
        const [watermarkedImages, trainingVideos] = await Promise.all([
          getAllWatermarkedImages(),
          getAllVideos()
        ]);
        
        setImages(watermarkedImages);
        setVideos(trainingVideos);
        console.log(images);
      } catch (error) {
        console.error("Error fetching media:", error);
        toast({
          title: "Error loading gallery",
          description: "There was a problem loading the gallery content",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMedia();
  }, [toast]);

  const getFilteredMedia = () => {
    switch(activeTab) {
      case "images":
        return images;
      case "videos":
        return videos;
      case "all":
      default:
        return [...images, ...videos];
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 bg-gradient-to-br from-dental-blue-soft/10 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-10 mt-8">
            <h1 className="text-4xl font-bold text-dental-dark-blue mb-4">
              Media Gallery
            </h1>
            <p className="text-dental-dark-gray max-w-2xl mx-auto">
              Explore our collection of dental care images and videos showcasing our clinic, procedures, and educational content.
            </p>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="images" onValueChange={(value) => setActiveTab(value as any)} className="w-full">
              <div className="flex justify-center">
                <TabsList className="grid w-full max-w-md  items-center ">
                  <TabsTrigger value="images" className="flex items-center gap-2">
                    <Image size={16} />
                    Images
                  </TabsTrigger>
                  {/* <TabsTrigger value="videos" className="flex items-center gap-2">
                    <Video size={16} />
                    Videos
                  </TabsTrigger> */}
                  {/* <TabsTrigger value="videos" className="flex items-center gap-2">
                    <Video size={16} />
                    Videos
                  </TabsTrigger> */}
                </TabsList>
              </div>
            </Tabs>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <p className="text-dental-dark-gray">Loading gallery...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {getFilteredMedia().map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-3">
                    <div className="overflow-hidden rounded-md">
                      <AspectRatio ratio={9/15} className="bg-muted">
                        {item.url ? ( // Images
                          <img
                            src={item.url}
                            alt={''}
                            className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                          />
                        ) : ( // Videos
                          <div className="relative w-full h-full">
                            <img
                              src={item.thumbnail || "https://placehold.co/400x300?text=Video"}
                              alt={''}
                              className="object-cover w-full h-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-black" asChild>
                                <a href={item.video_url} target="_blank" rel="noopener noreferrer" className=" text-black ">
                                  <Video className="h-4 w-4 mr-2 text-black " /> Watch
                                </a>
                              </Button>
                            </div>
                          </div>
                        )}
                      </AspectRatio>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && getFilteredMedia().length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <p className="text-dental-dark-gray mb-2">No media content available yet</p>
              <p className="text-sm text-dental-dark-gray/70">Check back later for updates to our gallery</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default GalleryPage;
