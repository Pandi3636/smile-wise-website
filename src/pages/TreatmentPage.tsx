
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Treatment data - in a real application, this would come from a database
const treatments = {
  "general-dentistry": {
    title: "General Dentistry",
    description: "Our general dentistry services cover routine check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Prevent tooth decay and gum disease",
      "Early detection of dental problems",
      "Maintain overall oral health",
      "Professional teeth cleaning"
    ]
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our cosmetic dentistry services including teeth whitening, veneers, and smile makeovers.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Enhance your smile's appearance",
      "Boost your confidence",
      "Correct discoloration and staining",
      "Fix chips, cracks and gaps"
    ]
  },
  "orthodontics": {
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with our modern orthodontic treatments including braces and clear aligners.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Straighten misaligned teeth",
      "Correct bite problems",
      "Improve oral function",
      "Enhance facial aesthetics"
    ]
  },
  "root-canal": {
    title: "Root Canal Treatment",
    description: "Save your natural tooth and relieve pain with our gentle and effective root canal treatments.",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Eliminate tooth pain",
      "Save your natural tooth",
      "Prevent infection spread",
      "Restore tooth functionality"
    ]
  },
  "implants": {
    title: "Dental Implants",
    description: "Replace missing teeth with dental implants that look, feel, and function like your natural teeth.",
    image: "https://images.unsplash.com/photo-1601458889412-87ad29e::hl=en&w=1200&q=80",
    benefits: [
      "Permanent solution for missing teeth",
      "Preserve facial structure",
      "Look and function like natural teeth",
      "No adhesives or removable parts"
    ]
  },
  "childrens-dentistry": {
    title: "Children's Dentistry",
    description: "Specialized dental care for children in a friendly, comfortable environment to establish good oral health habits early.",
    image: "https://images.unsplash.com/photo-1559608568-298537e67dc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Early detection of dental issues",
      "Child-friendly dental environment",
      "Education on proper oral hygiene",
      "Preventive treatments"
    ]
  },
  "laser-dentistry": {
    title: "Laser Dentistry",
    description: "Advanced laser technology for more comfortable and precise dental procedures with faster healing times.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Less pain and discomfort",
      "Reduced bleeding and swelling",
      "Faster healing times",
      "More precise treatment"
    ]
  },
  "smile-corrections": {
    title: "Smile Corrections",
    description: "Comprehensive smile makeover services to address multiple aesthetic concerns and give you the smile of your dreams.",
    image: "https://images.unsplash.com/photo-1581263518256-ba4a28ed5517?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ]
  },
};

const TreatmentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? treatments[slug as keyof typeof treatments] : null;

  if (!treatment) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-3xl font-bold text-center">Treatment not found</h1>
          <p className="text-center mt-4">The treatment you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Treatment Hero */}
      <div 
        className="relative pt-32 pb-20" 
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${treatment.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{treatment.title}</h1>
          <p className="text-xl text-white max-w-2xl">{treatment.description}</p>
        </div>
      </div>
      
      {/* Treatment Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold text-dental-dark-gray mb-6">About {treatment.title}</h2>
            <p className="text-gray-700 mb-6">
              At Dr. Prabha's Dental Clinic, we provide exceptional {treatment.title.toLowerCase()} services 
              using the latest technology and techniques. Our experienced team is committed to delivering 
              the best results with your comfort and satisfaction as our top priority.
            </p>
            <p className="text-gray-700 mb-8">
              We understand that each patient is unique, which is why we create personalized treatment 
              plans tailored to your specific needs and goals. Our modern facility is equipped with 
              state-of-the-art technology to ensure the highest standard of care.
            </p>
            
            <Button asChild className="bg-dental-blue hover:bg-blue-600">
              <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </a>
            </Button>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-dental-dark-gray mb-6">Benefits</h3>
            <ul className="space-y-4">
              {treatment.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-dental-mint rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dental-blue" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TreatmentPage;
