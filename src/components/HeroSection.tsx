
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="pt-24 pb-16 lg:min-h-screen bg-gradient-to-b from-dental-light-blue/30 to-white flex items-center"
          style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2069&auto=format&fit=crop")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}

    
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Welcome to Dr. Prabha's Dental Your Perfect
Smile Starts Here
            </h1>
            <p className="text-lg text-white-600 mb-8 max-w-lg">
              We provide comprehensive dental care with a gentle touch. Your smile is our priority - let us help you maintain a healthy, beautiful smile.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-dental-blue" />
                <span>1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-dental-blue" />
                <a href="tel:+919597876632" className="hover:text-dental-blue transition-colors">095978 76632</a>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-dental-blue" />
                <span>Mon–Fri, 5–9 pm</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-dental-blue hover:bg-blue-600 shadow-md">
                <a href="#schedule">
                  <Phone className="mr-2" size={18} />
                  Book Appointment
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-dental-blue text-dental-blue hover:bg-dental-light-blue/30">
                <a href="#services">Our Services</a>
              </Button>
            </div>
          </div>

          {/* <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-dental-blue/10 rounded-full"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-dental-blue/20 rounded-full"></div>
              <img 
                src="https://images.unsplash.com/photo-1606811971618-4486d14f3f99?q=80&w=2069&auto=format&fit=crop" 
                alt="Dental care" 
                className="rounded-lg shadow-lg w-full h-[450px] object-cover relative z-10"
              />
              <div className="absolute top-4 right-4 bg-dental-blue text-white py-2 px-4 rounded-full text-sm font-medium z-20 shadow-md">
                Gentle Care
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
