
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";
import { DoctorTip, getDoctorTipById } from "@/services/doctorTipsService";

const DoctorTipDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [tip, setTip] = useState<DoctorTip | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchTipDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const fetchedTip = await getDoctorTipById(id);
        
        if (fetchedTip) {
          setTip(fetchedTip);
        } else {
          // If tip not found in database, check hardcoded tips
          const hardcodedTip = getHardcodedTip(id);
          if (hardcodedTip) {
            setTip(hardcodedTip);
          } else {
            toast({
              title: "Not Found",
              description: "The requested doctor tip could not be found",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching doctor tip:", error);
        toast({
          title: "Error",
          description: "Failed to load doctor tip details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchTipDetails();
  }, [id, toast]);
  
  // Fallback data for hardcoded tips
  const getHardcodedTip = (tipId: string): DoctorTip | null => {
    const hardcodedTips = [
      {
        id: "1",
        name: "Flossing Importance",
        title: "Why Flossing is as Important as Brushing",
        description: "Flossing is often skipped in daily oral hygiene routines, but it's actually just as essential as brushing! When you brush your teeth, you're only cleaning about 60% of your tooth surfaces. Floss reaches those tight spaces between teeth that your toothbrush can't access, removing plaque and food particles that can lead to cavities and gum disease. Dr. Prabha recommends flossing at least once daily, preferably before bedtime. For proper technique, use about 18 inches of floss, wrap it around your middle fingers, and gently slide it between teeth, curving it against each tooth in a C-shape. Remember, healthy gums might bleed initially when you start flossing regularly, but this should subside within a week or two as your gum health improves.",
        author: "Dr. Prabha",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKz9wpYfUyavigCRdSXyS-CwQLjmWjGQTH8Q&s",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "2",
        name: "Foods That Stain",
        title: "Top 5 Foods That Stain Your Teeth",
        description: "Many people are surprised to learn that their diet significantly impacts the whiteness of their smile. The top five foods and beverages that cause tooth staining are: 1) Coffee and Tea - The dark color compounds called tannins can cause yellowing. 2) Red Wine - Contains chromogens and tannins that lead to discoloration. 3) Curry - The deep pigmentation can stain teeth over time. 4) Berries - Blueberries, blackberries, and pomegranates contain powerful pigments. 5) Tomato-based sauces - Their acidity and bright red color create perfect conditions for staining. To minimize staining, Dr. Prabha recommends drinking water after consuming these foods, using a straw for beverages when possible, and maintaining regular professional dental cleanings twice yearly.",
        author: "Dr. Prabha",
        image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyef76wUc1ywuU0aYfdaMoBZHWq3EI5rgu_NPpczQsuydG3X3veZYjibW8RmB3TaBvT7Y&usqp=CAU",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "3",
        name: "Toothbrush Replacement",
        title: "Is Your Toothbrush Too Old?",
        description: "Many patients are surprised to learn they should be replacing their toothbrush every 3 to 4 months. Over time, bristles become frayed and worn, making them less effective at cleaning teeth and removing plaque. Additionally, bacteria can accumulate on toothbrushes over time, especially after you've been sick. Signs that it's time for replacement include: visibly frayed bristles, discoloration of the bristles, or any mold growth (particularly if stored in a humid bathroom). After recovering from a cold, flu, or other infection, it's a good idea to replace your toothbrush even if it's relatively new. Remember, an effective toothbrush is fundamental to good oral hygiene, so make replacement a regular part of your health routine.",
        author: "Dr. Prabha",
        image_url: "https://static.vecteezy.com/system/resources/previews/017/324/224/non_2x/a-bunch-of-old-worn-out-toothbrushes-with-bent-bristles-on-a-white-background-photo.jpg",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: "4",
        name: "Kids Oral Habits",
        title: "How to Help Kids Develop Good Oral Habits",
        description: "Establishing good oral hygiene habits early sets children up for a lifetime of healthy teeth and gums. Start by making brushing fun - use colorful toothbrushes, flavored children's toothpaste, and turn brushing into a family activity. Set a consistent schedule, brushing after breakfast and before bedtime, to establish a routine. Use timers or sing two-minute songs to ensure adequate brushing time. For children under 8, parents should assist or supervise brushing to ensure all surfaces are cleaned properly. Introduce flossing as soon as teeth begin touching, using child-friendly floss picks if traditional flossing is difficult. Most importantly, be a good role model by demonstrating your own consistent oral care routine. Regular dental check-ups starting by the first birthday will help your child become comfortable with dental visits and allow for early detection of any potential issues.",
        author: "Dr. Prabha",
        image_url: "https://cdn.shopify.com/s/files/1/0661/2113/8345/files/WEB-BANNERS19.jpg?v=1728290727",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ];
    
    return hardcodedTips.find(t => t.id === tipId) || null;
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-lg">Loading doctor tip...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col justify-center items-center min-h-[400px]">
            <h2 className="text-2xl font-bold mb-2">Doctor Tip Not Found</h2>
            <p className="text-gray-600">The requested doctor tip could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-dental-dark-gray mb-4">{tip.title}</h1>
            <div className="flex items-center text-gray-600 mb-6">
              <span className="mr-4">By {tip.author}</span>
              <span>{new Date(tip.created_at).toLocaleDateString()}</span>
            </div>
            {tip.image_url && (
              <div className="mb-8">
                <img
                  src={tip.image_url}
                  alt={tip.title}
                  className="w-full max-h-[400px] object-cover rounded-lg"
                />
              </div>
            )}
            <div className="prose max-w-none">
              {/* Render content with paragraph breaks */}
              {tip.description.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorTipDetail;
