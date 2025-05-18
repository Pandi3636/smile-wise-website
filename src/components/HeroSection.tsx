
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const clinicPhoneNumber = '+919597876632'; // Updated to the actual clinic number
  const handlePhoneCall = () => {
    window.location.href = `tel:${clinicPhoneNumber}`;
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//WhatsApp%20Image%202025-05-17%20at%2021.37.31.jpeg"
          alt="Modern dental office"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-dental-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-dental-blue/10 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
              Your Perfect
              <span className="text-dental-blue"> Smile</span>
              <br />
              Starts Here.
            </h1>
            <p className="text-xl text-black-200 max-w-2xl mx-auto leading-relaxed">
              We provide comprehensive dental care with a gentle touch. Your smile is our priority - let us help you maintain a healthy, beautiful smile.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" onClick={handlePhoneCall}
              className="bg-dental-blue hover:bg-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300">
              <a href="#schedule" className="flex items-center">
                <Phone className="mr-2" size={18} />
                Book Appointment
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-black hover:bg-white/10 transform hover:scale-105 transition-all duration-300">
              <a href="#services" className="flex items-center">
                <ArrowRight className="mr-2" size={18} />
                Our Services
              </a>
            </Button>
          </div>

          {/* Trust indicators */}
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
