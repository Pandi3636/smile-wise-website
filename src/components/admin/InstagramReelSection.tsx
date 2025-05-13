
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { saveInstagramReel } from "@/services/mediaService";

const InstagramReelSection = () => {
  const [reelUrl, setReelUrl] = useState("");
  const [title, setTitle] = useState("");
  const [reels, setReels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reelUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid Instagram reel URL",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const savedReel = await saveInstagramReel({
        url: reelUrl,
        title: title || "Instagram Reel",
      });
      
      setReels([savedReel, ...reels]);
      setReelUrl("");
      setTitle("");
      
      toast({
        title: "Success",
        description: "Instagram reel saved successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save Instagram reel",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const extractEmbedCode = (url: string) => {
    try {
      const urlObj = new URL(url);
      const path = urlObj.pathname;
      // Extract the reel ID from Instagram URL
      const reelId = path.split('/').filter(Boolean)[1] || '';
      return reelId;
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div>
            <Label htmlFor="title">Title (Optional)</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for this reel"
            />
          </div>
          
          <div>
            <Label htmlFor="reel-url">Instagram Reel URL</Label>
            <Input
              id="reel-url"
              value={reelUrl}
              onChange={(e) => setReelUrl(e.target.value)}
              placeholder="https://www.instagram.com/reel/..."
              required
            />
          </div>
        </div>
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Reel"}
        </Button>
      </form>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preview</h3>
        {reelUrl ? (
          <div className="aspect-[9/16] max-w-sm mx-auto border rounded-lg overflow-hidden">
            {extractEmbedCode(reelUrl) ? (
              <iframe
                src={`https://www.instagram.com/p/${extractEmbedCode(reelUrl)}/embed/`}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 text-sm text-gray-500">
                Enter a valid Instagram URL to preview
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-100 text-sm text-gray-500 rounded-lg">
            Enter an Instagram reel URL to preview
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Saved Reels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reels.length > 0 ? (
            reels.map((reel, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 truncate">{reel.title}</h4>
                  <div className="aspect-[9/16] border rounded overflow-hidden mb-2">
                    <iframe
                      src={`https://www.instagram.com/p/${extractEmbedCode(reel.url)}/embed/`}
                      className="w-full h-full"
                      frameBorder="0"
                      scrolling="no"
                      allowFullScreen
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No saved reels yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstagramReelSection;
