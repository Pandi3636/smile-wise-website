
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-dental-light-mint">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{ backgroundImage: "url('/lovable-uploads/3c493a50-d6e4-4f6a-8b12-3c2d52c9f759.png')" }}
      ></div>
      <div className="relative container mx-auto px-4 py-12 md:py-24">
        <div className="bg-white/90 p-6 md:p-10 rounded-lg shadow-lg max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Dr. Prabha's Dental<br/>
            <span className="text-dental-blue">Your Perfect Smile Starts Here</span>
          </h1>
          
          <p className="text-gray-700 text-lg mb-8">
            We provide comprehensive dental care with a gentle touch.
            Your smile is our priority - let us help you maintain a
            healthy, beautiful smile.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 text-dental-blue mr-2" />
              <span>1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Phone className="h-5 w-5 text-dental-blue mr-2" />
              <span>095978 76632</span>
            </div>
            
            <div className="flex items-center text-gray-700">
              <Clock className="h-5 w-5 text-dental-blue mr-2" />
              <span>Mon–Fri, 5–9 pm</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-dental-blue hover:bg-dental-dark-blue text-white">
              <Link to="/book-appointment">Book Appointment</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-dental-blue text-dental-blue hover:bg-dental-light-blue/10">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
