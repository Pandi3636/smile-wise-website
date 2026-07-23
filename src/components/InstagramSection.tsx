import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { ChevronLeft, ChevronRight } from "lucide-react";

const InstagramSection = () => {
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchInstagramReels();
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -1200,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 1200,
      behavior: "smooth",
    });
  };

  const fetchInstagramReels = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("instagram_reels")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const transformedReels =
        data?.map((reel) => ({
          id: reel.id,
          title: reel.title,
          url: reel.url,
          reelEmbedUrl: `${reel.url}embed/captioned/`,
        })) || [];

      setReels(transformedReels);
    } catch (error) {
      console.error("Error fetching Instagram reels:", error);

      toast({
        title: "Error loading Instagram reels",
        description: "Could not load reels. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-dental-light-blue/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Instagram Tips
          </h2>
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
            Quick dental tips and behind-the-scenes glimpses from our Instagram.
            Follow us for daily dental insights!
          </p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Reels Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth px-12"
          >
            {reels.map((reel) => (
              <Card
                key={reel.id}
                className="overflow-hidden flex-shrink-0 w-full md:w-[280px]"
              >
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative h-96 overflow-hidden">
                    <iframe
                      src={reel.reelEmbedUrl}
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      title={reel.title || `Instagram Reel ${reel.id}`}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex flex-col justify-end p-4">
                      <div className="flex items-center mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          />
                          <circle cx="12" cy="12" r="4" />
                          <circle cx="18" cy="6" r="1.5" />
                        </svg>
                        <span className="text-white text-sm ml-2">
                          View on Instagram
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://www.instagram.com/drprabhasdentistry/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <rect
                x="2"
                y="2"
                width="20"
                height="20"
                rx="5"
                ry="5"
              />
              <circle cx="12" cy="12" r="4" />
              <circle cx="18" cy="6" r="1.5" />
            </svg>
            Follow Us on Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;