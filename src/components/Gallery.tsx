
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowRight, ArrowLeft } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const tips = [
  {
    title: "Proper Brushing Technique",
    description: "Brush your teeth at a 45° angle to your gums for 2 minutes, twice daily. Use a soft-bristled brush in circular motions and don't forget to brush your tongue to remove bacteria!",
    image: "https://lh3.googleusercontent.com/p/AF1QipPFtmTOwj7wtfIbbTrr2nLdoizFVWUIWZNrjVpf=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Flossing Importance",
    description: "Floss once a day to remove plaque from between teeth where your toothbrush can't reach. Use gentle movements to avoid gum damage and ensure you clean both sides of each tooth.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNoqgbhfZ5fNTMLOIan46Awdgt3gh_3waN4eTiy=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Healthy Diet for Teeth",
    description: "Limit sugary and acidic foods that can erode enamel. Eat calcium-rich foods like dairy, nuts, and leafy greens to strengthen teeth and bones. Drink plenty of water to wash away food particles.",
    image: "https://lh3.googleusercontent.com/p/AF1QipOU3PxgQNf2BqTKh2vAtPwjh5Td2qHR63kImdN_=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "When to Replace Your Toothbrush",
    description: "Replace your toothbrush every 3-4 months or sooner if bristles are frayed. A worn toothbrush isn't effective at cleaning and may harbor bacteria. After illness, consider replacing it sooner.",
    image: "https://lh3.googleusercontent.com/p/AF1QipPdP5OxqA_12vAHbCrLsJJmi9Bfbi1ncjonhOXc=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Preventing Gum Disease",
    description: "Regular dental checkups, daily flossing, and proper brushing are essential for preventing gingivitis and periodontitis. Early detection is key. Watch for signs like bleeding gums, bad breath, and gum recession.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNzCnAUG7F0SOW1QkKULqaiIRR8BYJbO8qoDr5K=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Whitening Tips",
    description: "For natural whitening, try baking soda and hydrogen peroxide paste once a week. For professional results, consult Dr. Prabha about in-office treatments. Avoid staining foods like coffee, tea, and red wine.",
    image: "https://lh3.googleusercontent.com/p/AF1QipM33tE7NF7uQmsTUTOWJKEfZAaaTUIreqmE9yQv=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Managing Dental Anxiety",
    description: "Communicate your fears with your dentist. Consider distraction techniques like listening to music during treatment. Deep breathing exercises can help calm nerves before and during appointments.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNawQrL61MUEeuYoQkHlj5_tqm-7rVF4lgo--Xg=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
  {
    title: "Caring for Sensitive Teeth",
    description: "Use toothpaste specially formulated for sensitive teeth. Avoid extremely hot or cold foods. Consider using a soft-bristled toothbrush and brushing gently. Consult Dr. Prabha if sensitivity persists.",
    image: "https://lh3.googleusercontent.com/p/AF1QipNhmTAa9HXMdxtmDzDYM2x0ld4doXHeF7HkNKL0=s1360-w1360-h1020-rw",
    author: "Dr. Prabha"
  },
];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number | undefined;

    if (isAutoPlaying) {
      interval = window.setInterval(() => {
        setActiveIndex(prev => (prev + 1) % tips.length);
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const goToTip = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
  };

  const goToPrevTip = () => {
    setActiveIndex(prev => (prev - 1 + tips.length) % tips.length);
    setIsAutoPlaying(false);
  };

  const goToNextTip = () => {
    setActiveIndex(prev => (prev + 1) % tips.length);
    setIsAutoPlaying(false);
  };

  return (
    <section id="dental-tips" className="py-16 bg-gradient-to-br from-dental-purple-light/20 via-dental-blue-soft/30 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Drprabhasdentistry Clinic
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">

          <Card className="border-none shadow-xl overflow-hidden mx-auto max-w-6xl bg-white">
            <div className="h-[500px]"> {/* Set fixed height */}
              <div className="h-full overflow-hidden relative"> {/* Match parent height */}
                <img
                  src={tips[activeIndex].image}
                  alt={''}
                  className="w-full h-full object-fit transition-transform duration-500 hover:scale-105"
                />

              </div>
                <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="flex space-x-2">
                    {tips.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToTip(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${index === activeIndex ? "bg-dental-purple" : "bg-gray-300"
                          }`}
                        aria-label={`Go to tip ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-dental-purple text-dental-purple hover:bg-dental-purple-light/20"
                      onClick={goToPrevTip}
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span className="sr-only">Previous tip</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-dental-purple hover:text-dental-purple-dark"
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    >
                      {isAutoPlaying ? "Pause" : "Auto Play"}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-dental-purple text-dental-purple hover:bg-dental-purple-light/20"
                      onClick={goToNextTip}
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Next tip</span>
                    </Button>
                  </div>
                </CardFooter>
            </div>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Gallery;
