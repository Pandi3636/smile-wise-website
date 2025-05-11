
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, BookOpenText, ListVideo } from "lucide-react";

const categories = [
  { id: "general", name: "General Dentistry" },
  { id: "cosmetic", name: "Cosmetic Dentistry" },
  { id: "pediatric", name: "Pediatric Dentistry" },
  { id: "orthodontics", name: "Orthodontics" },
  { id: "oral-surgery", name: "Oral Surgery" },
  { id: "endodontics", name: "Endodontics" }
];

const videos = {
  general: [
    {
      id: 1,
      title: "Basics of Oral Hygiene – Brushing Techniques",
      thumbnail: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?q=80&w=1173&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "4:23"
    },
    {
      id: 2,
      title: "Understanding Gum Disease",
      thumbnail: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=1173&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:45"
    },
    {
      id: 3,
      title: "Dental Check-up: What to Expect",
      thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:12"
    },
    {
      id: 4,
      title: "Flossing Properly - Step by Step Guide",
      thumbnail: "https://images.unsplash.com/photo-1588776814546-daefec70d1ee?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "2:34"
    }
  ],
  cosmetic: [
    {
      id: 1,
      title: "Teeth Whitening – What to Expect",
      thumbnail: "https://images.unsplash.com/photo-1581593261424-28069a7a5ade?q=80&w=1173&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "6:07"
    },
    {
      id: 2,
      title: "Veneer Procedure Explained",
      thumbnail: "https://images.unsplash.com/photo-1616587894289-86480e533129?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "4:58"
    },
    {
      id: 3,
      title: "Dental Bonding for Chipped Teeth",
      thumbnail: "https://images.unsplash.com/photo-1598256989800-fe5f95da9326?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:21"
    },
    {
      id: 4,
      title: "Professional Teeth Cleaning Process",
      thumbnail: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:45"
    }
  ],
  pediatric: [
    {
      id: 1,
      title: "Tips to Keep Your Child's Teeth Healthy",
      thumbnail: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "4:10"
    },
    {
      id: 2,
      title: "Making Dental Visits Fun for Kids",
      thumbnail: "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:42"
    },
    {
      id: 3,
      title: "Baby's First Dental Visit - What Parents Should Know",
      thumbnail: "https://images.unsplash.com/photo-1595008753489-75c8d235f047?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "6:23"
    },
    {
      id: 4,
      title: "Preventing Tooth Decay in Children",
      thumbnail: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:16"
    }
  ],
  orthodontics: [
    {
      id: 1,
      title: "Braces vs Aligners – Which is Right for You?",
      thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1169&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "7:12"
    },
    {
      id: 2,
      title: "Caring for Your Braces",
      thumbnail: "https://images.unsplash.com/photo-1649972180596-3e08bbdce7ee?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "4:33"
    },
    {
      id: 3,
      title: "Life with Invisalign - Patient Experience",
      thumbnail: "https://images.unsplash.com/photo-1581590212391-35929993a52b?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:47"
    },
    {
      id: 4,
      title: "Orthodontic Emergencies - What to Do",
      thumbnail: "https://images.unsplash.com/photo-1601247387431-ee5815d704d2?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:59"
    }
  ],
  "oral-surgery": [
    {
      id: 1,
      title: "Wisdom Teeth Extraction Procedure",
      thumbnail: "https://images.unsplash.com/photo-1599011412187-729fb97d3f35?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "6:42"
    },
    {
      id: 2,
      title: "Dental Implant Surgery - Step by Step",
      thumbnail: "https://images.unsplash.com/photo-1648164399686-0a75c9d1ea83?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "8:15"
    },
    {
      id: 3,
      title: "Recovery After Oral Surgery - Tips and Guidelines",
      thumbnail: "https://images.unsplash.com/photo-1546448396-6aef80193ceb?q=80&w=1171&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:21"
    },
    {
      id: 4,
      title: "Bone Grafting for Dental Implants",
      thumbnail: "https://images.unsplash.com/photo-1609243064566-f4e931318c30?q=80&w=1174&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "7:03"
    }
  ],
  "endodontics": [
    {
      id: 1,
      title: "Root Canal Treatment Explained",
      thumbnail: "https://images.unsplash.com/photo-1606811951341-9be556119288?q=80&w=1174&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "7:22"
    },
    {
      id: 2,
      title: "Signs You Need a Root Canal",
      thumbnail: "https://images.unsplash.com/photo-1541604193435-22287d32c2c2?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "4:18"
    },
    {
      id: 3,
      title: "Myths About Root Canal Treatment",
      thumbnail: "https://images.unsplash.com/photo-1600170292167-3beb1b0932e3?q=80&w=1170&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "5:34"
    },
    {
      id: 4,
      title: "After Your Root Canal - Recovery and Care",
      thumbnail: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?q=80&w=1176&auto=format&fit=crop",
      videoId: "dQw4w9WgXcQ", // Example YouTube video ID
      duration: "3:47"
    }
  ]
};

const TrainingSection = () => {
  const [selectedVideo, setSelectedVideo] = useState<null | {
    title: string;
    videoId: string;
  }>(null);

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
        </div>

        <Tabs defaultValue="general" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(videos).map(([category, categoryVideos]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categoryVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div 
                      className="relative h-44 overflow-hidden"
                      onClick={() => setSelectedVideo({ title: video.title, videoId: video.videoId })}
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
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{video.title}</h3>
                    </CardContent>
                  </Card>
                ))}
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
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrainingSection;
