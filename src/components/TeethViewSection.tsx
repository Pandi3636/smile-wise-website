
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const TeethViewSection = () => {
  const [rotation, setRotation] = useState(0);
  const [activeView, setActiveView] = useState<"healthy" | "rootcanal">("healthy");

  const handleRotate = (direction: "left" | "right") => {
    setRotation((prev) => {
      if (direction === "left") {
        return prev - 45;
      } else {
        return prev + 45;
      }
    });
  };

  // Dental images collection
  const dentalImages = {
    healthy: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrqJpfU_i24zvMUG21dhwCoEaHU5ZAkrswmg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrqJpfU_i24zvMUG21dhwCoEaHU5ZAkrswmg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVkoVfQYfhqm0EwV6OlSIaD2GwZErdWrrhnA&s"
    ],
    rootcanal: [
      "https://images.unsplash.com/photo-1601301152579-aa13c66f45b3?q=80&w=1780&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1643401870838-23937ad9972b?q=80&w=1780&auto=format&fit=crop"
    ]
  };

  return (
    <section id="teeth-view" className="py-16 bg-#f0f5fe">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">360° Dental Visualization</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Interactive view of dental procedures – Compare healthy teeth with root canal treatments
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <Button 
              variant={activeView === "healthy" ? "default" : "outline"}
              onClick={() => setActiveView("healthy")}
              className={activeView === "healthy" ? "bg-dental-blue" : ""}
            >
              Healthy Teeth
            </Button>
            <Button 
              variant={activeView === "rootcanal" ? "default" : "outline"}
              onClick={() => setActiveView("rootcanal")}
              className={activeView === "rootcanal" ? "bg-dental-blue" : ""}
            >
              Root Canal Treatment
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden" >
            <CardContent className="p-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="aspect-video bg-dental-light-gray rounded-lg flex items-center justify-center relative"  >
                  <div 
                    style={{ 
                      transform: `rotateY(${rotation}deg)`,
                      transition: 'transform 0.5s ease'
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Carousel className="w-full max-w-md">
                      <CarouselContent>
                        {dentalImages[activeView].map((src, index) => (
                          <CarouselItem key={index}>
                            <div className="p-1">
                              <img 
                                src={src} 
                                alt={`${activeView === 'healthy' ? 'Healthy tooth' : 'Root canal'} view ${index + 1}`} 
                                className="w-full h-64 object-contain rounded-md"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <Button 
                      variant="outline"
                      onClick={() => handleRotate("left")}
                      className="bg-white"
                    >
                      ← Rotate Left
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleRotate("right")}
                      className="bg-white"
                    >
                      Rotate Right →
                    </Button>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <div className="bg-dental-light-blue/10 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-dental-dark-gray mb-2">
                      {activeView === "healthy" ? "Healthy Teeth Characteristics" : "Root Canal Treatment"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {activeView === "healthy" 
                        ? "Healthy teeth have intact enamel, pink gums, and no visible decay. Regular checkups help maintain optimal oral health."
                        : "Root canal treatment removes infected pulp, cleans the canal, and seals it to prevent reinfection, saving the natural tooth structure."}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TeethViewSection;
