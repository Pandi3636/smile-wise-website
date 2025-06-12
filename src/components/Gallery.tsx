import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const hardcodedImages = [
  {
    id: 1,
    title: "",
    image_url: "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/0.3729503657982117.jpg",
  },
  {
    id: 2,
    title: "",
    image_url: "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/0.13196672411948218.jpg",
  },
  {
    id: 3,
    title: "",
    image_url: "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/0.46288222783133626.jpg",
  },
    {
    id: 4,
    title: "",
    image_url: "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/0.6491865927820732.jpg",
  },

];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number | undefined;
    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % hardcodedImages.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  return (
    <section id="dental-tips" className="py-16 bg-gradient-to-br from-dental-purple-light/20 via-dental-blue-soft/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins text-dental-dark-blue">
            Dr Prabha's Dentistry Clinic
          </h2>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
  {hardcodedImages.map((image, index) => (
    <Card key={image.id} className="border-none shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
      <div>
        <AspectRatio ratio={10 / 16} className="bg-muted">
          <div className="h-full overflow-hidden relative">
            <img
              src={image.image_url}
              alt={''}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </AspectRatio>
      </div>
    </Card>
  ))}
</div>

      </div>


    </section>
  );
};

export default Gallery;
