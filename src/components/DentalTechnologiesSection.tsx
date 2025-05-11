
import { Card, CardContent } from "@/components/ui/card";
import { Camera, FileImage, Calendar } from "lucide-react";

const technologies = [
  {
    id: 1,
    title: "Digital X-Rays",
    description: "Advanced digital X-ray technology that produces immediate high-resolution images with reduced radiation exposure.",
    icon: <FileImage className="text-dental-blue w-8 h-8" />
  },
  {
    id: 2,
    title: "Intraoral Cameras",
    description: "Tiny cameras that show detailed images of your teeth and gums, helping you understand your dental conditions better.",
    icon: <Camera className="text-dental-blue w-8 h-8" />
  },
  {
    id: 3,
    title: "3D Dental Scanners",
    description: "Create precise digital models of your teeth for accurate treatment planning without messy traditional impressions.",
    icon: <Calendar className="text-dental-blue w-8 h-8" /> // Changed from Teeth to Calendar
  }
];

const DentalTechnologiesSection = () => {
  return (
    <section id="technologies" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Advanced Dental Technologies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            At Dr. Prabha's Dental Clinic, we use state-of-the-art technologies to provide the best care for our patients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {technologies.map((tech) => (
            <Card key={tech.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {tech.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2 text-center">{tech.title}</h3>
                <p className="text-gray-600 text-center">{tech.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DentalTechnologiesSection;
