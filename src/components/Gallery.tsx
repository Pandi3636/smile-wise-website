
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRight, ArrowLeft, Image } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchWatermarkedImages();
    
    let interval: number | undefined;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setActiveIndex(prev => (prev + 1) % images.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, images.length]);

  const fetchWatermarkedImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('watermarked_images')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
    setImages((data || []).slice(0, 3));  // ✅ only keep the 4 latest
      console.log(images)
    } catch (error) {
      console.error("Error fetching images:", error);
      toast({
        title: "Error loading gallery",
        description: "Could not load images. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const goToImage = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevImage = () => {
    setActiveIndex(prev => (prev - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
  };

  const goToNextImage = () => {
    setActiveIndex(prev => (prev + 1) % images.length);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-dental-purple-light/20 via-dental-blue-soft/30 to-white">
        <div className="container mx-auto px-4 text-center">
          <p>Loading gallery...</p>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-dental-purple-light/20 via-dental-blue-soft/30 to-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Dr prabhasdentistry Clinic
          </h2>
          <p>No images available in the gallery.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="dental-tips" className="py-16 bg-gradient-to-br from-dental-purple-light/20 via-dental-blue-soft/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Dr prabhas dentistry Clinic
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <Card key={image.id} className="border-none shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="h-[250px]">
                <div className="h-full overflow-hidden relative">
                  <img
                    src={image.image_url}
                    alt={image.title || ''}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-dental-dark-gray">{image.title || 'Untitled'}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(image.created_at).toLocaleDateString()}
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
