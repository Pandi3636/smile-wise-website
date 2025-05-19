import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRight, ArrowLeft, Image } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
          <h2 
            className="text-3xl font-bold text-dental-dark-gray mb-2 cursor-pointer hover:text-dental-blue transition-colors"
            onClick={() => setIsPopupOpen(true)}
          >
            Dr Prabhas dentistry Clinic
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

      <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-dental-dark-blue">Welcome to Dr Prabhas Dentistry Clinic</DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            <p className="text-gray-600">
              At Dr Prabhas Dentistry Clinic, we are committed to providing exceptional dental care with a focus on your comfort and satisfaction. Our state-of-the-art facility is equipped with the latest technology to ensure the best possible treatment outcomes.
            </p>
            <div className="bg-dental-light-blue/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-dental-dark-blue">Our Commitment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Quality dental care with utmost attention to detail</li>
                <li>• Modern technology and advanced treatment options</li>
                <li>• Experienced and compassionate dental professionals</li>
                <li>• Comfortable and welcoming environment</li>
                <li>• Personalized treatment plans for each patient</li>
              </ul>
            </div>
            <div className="bg-dental-light-blue/10 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-dental-dark-blue">Clinic Hours</h3>
              <p className="text-gray-600">Monday - Friday: 5:00 PM - 9:00 PM</p>
              <p className="text-gray-600">Saturday: By Appointment</p>
              <p className="text-gray-600">Sunday: Closed</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Gallery;
