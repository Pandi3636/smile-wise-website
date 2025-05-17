
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
          <div className="animate-fade-in text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-unifraktur">
              Dr prabhas dentistry,<br/>
              Your Perfect Smile Starts Here.
            </h1>
            <p className="text-lg text-white-600 mb-8 max-w-lg mx-auto lg:mx-0">
              We provide comprehensive dental care with a gentle touch. Your smile is our priority - let us help you maintain a healthy, beautiful smile.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <MapPin size={20} className="text-dental-black" />
                <span>1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095</span>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Phone size={20} className="text-dental-black" />
                <a href="tel:+919597876632" className="hover:text-dental-blue transition-colors">095978 76632</a>
              </div>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <Clock size={20} className="text-dental-black" />
                <span>Mon–Fri, 5–9 pm</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
