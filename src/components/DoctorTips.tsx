
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooth } from "lucide-react";
import { Link } from "react-router-dom";

const tipItems = [
  {
    id: 1,
    title: "Why Flossing is as Important as Brushing",
    description: "Dr. Prabha explains how daily flossing prevents gum disease and tooth decay.",
    slug: "flossing-importance"
  },
  {
    id: 2,
    title: "Top 5 Foods That Stain Your Teeth",
    description: "Learn which foods to avoid for a whiter smile.",
    slug: "foods-that-stain"
  },
  {
    id: 3,
    title: "Is Your Toothbrush Too Old?",
    description: "Replace it every 3 months or after an illness.",
    slug: "replace-toothbrush"
  },
  {
    id: 4,
    title: "How to Help Kids Develop Good Oral Habits",
    description: "Make brushing fun and consistent.",
    slug: "kids-oral-habits"
  }
];

const DoctorTips = () => {
  return (
    <section className="bg-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <Tooth className="h-8 w-8 text-dental-blue mr-2" />
            <h2 className="text-3xl font-bold text-gray-800">Doctor Tips</h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dental advice and tips from Dr. Prabha to help you maintain optimal oral health.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tipItems.map(tip => (
            <Link to={`/doctor-tips/${tip.slug}`} key={tip.id}>
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-dental-blue">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {tip.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            to="/doctor-tips"
            className="text-dental-blue hover:text-dental-dark-blue font-medium flex items-center"
          >
            View all tips
            <span className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorTips;
