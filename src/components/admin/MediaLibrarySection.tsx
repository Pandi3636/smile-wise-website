
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { 
  getAllWatermarkedImages, 
  getAllCompressedVideos, 
  getAllInstagramReels 
} from "@/services/mediaService";
import { 
  getAllVideos 
} from "@/services/videoService";
import { Eye, Trash, Grid2X2, List, Image, Film } from "lucide-react";

const MediaLibrarySection = () => {
  const [mediaType, setMediaType] = useState("images");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [images, setImages] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [trainingVideos, setTrainingVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchAllMedia();
  }, []);

  const fetchAllMedia = async () => {
    setIsLoading(true);
    try {
      // Fetch all media types
      const [watermarkedImages, compressedVideos, instagramReels, trainVideos] = await Promise.all([
        getAllWatermarkedImages(),
        getAllCompressedVideos(),
        getAllInstagramReels(),
        getAllVideos()
      ]);

      setImages(watermarkedImages);
      setVideos(compressedVideos);
      setReels(instagramReels);
      setTrainingVideos(trainVideos);
    } catch (error) {
      console.error("Error fetching media:", error);
      toast({
        title: "Error fetching media",
        description: "There was a problem loading your media files",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredMedia = () => {
    switch(mediaType) {
      case "images":
        return images;
      case "videos":
        return videos;
      case "reels":
        return reels;
      case "training":
        return trainingVideos;
      default:
        return [];
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading media...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <Tabs defaultValue="images" value={mediaType} onValueChange={setMediaType}>
          <TabsList>
            <TabsTrigger value="images" className="flex items-center gap-2">
              <Image size={16} />
              Images ({images.length})
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Film size={16} />
              Videos ({videos.length})
            </TabsTrigger>
            <TabsTrigger value="reels" className="flex items-center gap-2">
              <Film size={16} />
              Reels ({reels.length})
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <Film size={16} />
              Training ({trainingVideos.length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className={viewMode === "grid" ? "bg-muted" : ""}
            onClick={() => setViewMode("grid")}
          >
            <Grid2X2 size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={viewMode === "list" ? "bg-muted" : ""}
            onClick={() => setViewMode("list")}
          >
            <List size={16} />
          </Button>
          <Button variant="outline" onClick={fetchAllMedia}>
            Refresh
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {getFilteredMedia().map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-2">
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {mediaType === "images" && (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {(mediaType === "videos" || mediaType === "reels" || mediaType === "training") && (
                    <div className="relative w-full h-full flex items-center justify-center bg-black">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Film size={48} className="text-gray-400" />
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                        <Button variant="ghost" size="icon" className="text-white" asChild>
                          <a href={item.video_url || item.url} target="_blank" rel="noopener noreferrer">
                            <Eye size={24} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="pt-2">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {getFilteredMedia().map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="w-16 h-16 bg-gray-100 relative overflow-hidden">
                      {mediaType === "images" && (
                        <img
                          src={item.url}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      {(mediaType === "videos" || mediaType === "reels" || mediaType === "training") && (
                        <div className="w-full h-full flex items-center justify-center bg-black">
                          {item.thumbnail ? (
                            <img
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Film size={24} className="text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>
                    {mediaType === "images" && "Watermarked Image"}
                    {mediaType === "videos" && "Compressed Video"}
                    {mediaType === "reels" && "Instagram Reel"}
                    {mediaType === "training" && "Training Video"}
                  </TableCell>
                  <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild>
                        <a href={item.video_url || item.url} target="_blank" rel="noopener noreferrer">
                          <Eye size={16} />
                        </a>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {getFilteredMedia().length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-dashed">
          <p className="text-gray-500 mb-2">No {mediaType} found</p>
          <p className="text-sm text-gray-400">Upload some {mediaType} to see them here</p>
        </div>
      )}
    </div>
  );
};

export default MediaLibrarySection;
