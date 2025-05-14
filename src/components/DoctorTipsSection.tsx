
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { DoctorTip, getAllDoctorTips } from "@/services/doctorTipsService";
import { useToast } from "@/hooks/use-toast";

const DoctorTipsSection = () => {
  const [doctorTips, setDoctorTips] = useState<DoctorTip[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDoctorTips = async () => {
      try {
        const tips = await getAllDoctorTips();
        setDoctorTips(tips);
      } catch (error) {
        console.error("Error fetching doctor tips:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor tips",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorTips();
  }, [toast]);

  // Fallback data if no tips are returned from the database
  const fallbackTips = [
    {
      id: "1",
      title: "Why Flossing is as Important as Brushing",
      description: "Dr. Prabha explains how daily flossing prevents gum disease and tooth decay.",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKz9wpYfUyavigCRdSXyS-CwQLjmWjGQTH8Q&s",
      author: "Dr. Prabha",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Top 5 Foods That Stain Your Teeth",
      description: "Learn which foods to avoid for a whiter smile.",
      image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyef76wUc1ywuU0aYfdaMoBZHWq3EI5rgu_NPpczQsuydG3X3veZYjibW8RmB3TaBvT7Y&usqp=CAU",
      author: "Dr. Prabha",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Is Your Toothbrush Too Old?",
      description: "Replace it every 3 months or after an illness.",
      image_url: "https://static.vecteezy.com/system/resources/previews/017/324/224/non_2x/a-bunch-of-old-worn-out-toothbrushes-with-bent-bristles-on-a-white-background-photo.jpg",
      author: "Dr. Prabha",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "4",
      title: "How to Help Kids Develop Good Oral Habits",
      description: "Make brushing fun and consistent.",
      image_url: "https://cdn.shopify.com/s/files/1/0661/2113/8345/files/WEB-BANNERS19.jpg?v=1728290727",
      author: "Dr. Prabha",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Use database tips if available, otherwise fallback to hardcoded tips
  const tipsToDisplay = doctorTips.length > 0 ? doctorTips : fallbackTips;

  return (
    <section id="doctor-tips" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">Doctor Tips</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover professional advice from Dr. Prabha to maintain optimal dental health between visits.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading doctor tips...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tipsToDisplay.slice(0, 4).map((tip) => (
              <Card key={tip.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img
                    src={tip.image_url || 'https://placehold.co/600x400?text=Dental+Tip'}
                    alt={tip.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tip.description}</CardDescription>
                  <Link to={`/doctor-tips/${tip.id}`}>
                    <p className="text-dental-blue mt-2 hover:underline">View More</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link
            to="/doctor-tips"
            className="text-dental-blue hover:text-blue-700 font-medium inline-flex items-center"
          >
            View all doctor tips
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorTipsSection;
