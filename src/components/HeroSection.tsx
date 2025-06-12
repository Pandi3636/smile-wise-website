
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, ArrowRight } from "lucide-react";

const HeroSection = () => {
  const clinicPhoneNumber = '+919597876632'; // Updated to the actual clinic number
  const handlePhoneCall = () => {
    window.location.href = `tel:${clinicPhoneNumber}`;
  };

  const imageUrl = "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/20240917_180737%20(1).jpg";
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image */}
          <div className="flex-1 w-full">
            <div className="relative">
              <img
                src={imageUrl}
                alt="Modern dental office"
                className="w-full h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-dental-blue/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-dental-blue/10 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 w-full">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Your Perfect
                  <span className="text-dental-blue"> Smile</span>
                  <br />
                  Starts Here.
                </h1>
                <p className="text-xl text-gray-700 max-w-2xl font-bold leading-relaxed" style={{ fontFamily: "'Playpen Sans', cursive" }}>
                  "Quality with Utmost Care is Our Motto. We Provide Comprehensive Dental Care Where Your Smile Meets Expertise"
                </p>
              </div>

              {/* Address and Time Information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="text-dental-blue mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Our Location</p>
                    <p className="text-gray-600">Dr. Prabha's Dental Clinic, Vanagaram, Chennai</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="text-dental-blue mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Clinic Hours</p>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handlePhoneCall}
                  className="bg-dental-blue hover:bg-blue-600 shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <Phone className="mr-2" size={18} />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
