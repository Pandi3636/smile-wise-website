
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Youtube } from "lucide-react";

const videoCategories = [
  {
    id: "general",
    name: "General Dentistry",
    videos: [
      {
        id: 1,
        title: "Basics of Oral Hygiene – Brushing Techniques",
        description: "Learn the proper technique for effective tooth brushing.",
        thumbnail: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=300",
        youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube video ID
      }
    ]
  },
  {
    id: "cosmetic",
    name: "Cosmetic Dentistry",
    videos: [
      {
        id: 2,
        title: "Teeth Whitening – What to Expect",
        description: "Dr. Prabha explains the teeth whitening process and results.",
        thumbnail: "https://images.unsplash.com/photo-1606811951341-0227fb588805?q=80&w=300",
        youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube video ID
      }
    ]
  },
  {
    id: "pediatric",
    name: "Pediatric Dentistry",
    videos: [
      {
        id: 3,
        title: "Tips to Keep Your Child's Teeth Healthy",
        description: "Important tips for parents to maintain children's oral health.",
        thumbnail: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=300",
        youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube video ID
      }
    ]
  },
  {
    id: "orthodontics",
    name: "Orthodontics",
    videos: [
      {
        id: 4,
        title: "Braces vs Aligners – Which is Right for You?",
        description: "Compare different orthodontic options for teeth straightening.",
        thumbnail: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=300",
        youtubeId: "dQw4w9WgXcQ" // Replace with actual YouTube video ID
      }
    ]
  }
];

const VideoCard = ({ video }: { video: any }) => (
  <Card className="h-full transition-transform hover:scale-105">
    <CardContent className="p-4">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title} 
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 rounded-full p-3 shadow-md">
            <Youtube className="h-8 w-8 text-red-600" />
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-lg mb-1">{video.title}</h3>
      <p className="text-gray-600 text-sm">{video.description}</p>
    </CardContent>
  </Card>
);

const TrainingVideos = () => {
  const [activeCategory, setActiveCategory] = useState("general");

  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Youtube className="h-8 w-8 text-dental-blue mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Training Videos</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Educational videos to help you understand various dental procedures and maintain optimal oral health.
          </p>
        </div>

        <Tabs defaultValue="general" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-gray-100">
              {videoCategories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="data-[state=active]:bg-dental-blue data-[state=active]:text-white"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {videoCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.videos.map(video => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="flex justify-center mt-8">
          <a 
            href="https://youtube.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-dental-blue hover:text-dental-dark-blue font-medium flex items-center"
          >
            Visit our YouTube channel
            <span className="ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TrainingVideos;
