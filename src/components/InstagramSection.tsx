
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const InstagramSection = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchInstagramReels();
  }, []);

  const fetchInstagramReels = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('instagram_reels')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      
      // Transform data to include embed URLs
      const transformedReels = data?.map(reel => ({
        id: reel.id,
        title: reel.title,
        url: reel.url,
        reelEmbedUrl: `${reel.url}embed/captioned/`
      })) || [];
      
      setReels(transformedReels);
    } catch (error) {
      console.error("Error fetching Instagram reels:", error);
      toast({
        title: "Error loading Instagram reels",
        description: "Could not load reels. Please try again later.",
        variant: "destructive"
      });
      
      // Fallback to default reels if there's an error
      // setReels([ ]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-dental-light-blue/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">Instagram Tips</h2>
          <p>Loading Instagram tips...</p>
        </div>
      </section>
    );
  }


  return (
    <section className="py-16 bg-dental-light-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Instagram Tips
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Quick dental tips and behind-the-scenes glimpses from our Instagram. Follow us for daily dental insights!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
{reels.slice(0, 4).map((reel) => (
            <Card key={reel.id} className="overflow-hidden ">
              <a href={reel.url} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative h-96 overflow-hidden">
                  <iframe
                    src={reel.reelEmbedUrl}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4">
                    <div className="flex items-center mt-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <circle cx="12" cy="12" r="4"></circle>
                        <circle cx="18" cy="6" r="1.5"></circle>
                      </svg>
                      <span className="text-white text-sm ml-2">View on Instagram</span>
                    </div>
                  </div>
                </div>
              </a>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <a 
            href="https://www.instagram.com/drprabhasdentistry/?utm_source=qr&igsh=NGhrZmF3enM0NGhz#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <circle cx="12" cy="12" r="4"></circle>
              <circle cx="18" cy="6" r="1.5"></circle>
            </svg>
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
