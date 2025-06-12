
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, Sparkles, Shield, Award } from "lucide-react";

const HeroSection = () => {
  const clinicPhoneNumber = '+919597876632';
  const handlePhoneCall = () => {
    window.location.href = `tel:${clinicPhoneNumber}`;
  };

  const imageUrl = "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/20240917_180737%20(1).jpg";
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-blue-50 via-white to-mint-50 relative overflow-hidden">
      {/* Dental-themed background decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border-4 border-dental-blue/20 rounded-full animate-pulse"></div>
      <div className="absolute top-32 right-20 w-12 h-12 bg-dental-mint/30 rounded-full blur-sm"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 border-2 border-dental-light-blue/30 rounded-full"></div>
      <div className="absolute bottom-32 right-32 w-8 h-8 bg-dental-blue/20 rounded-full animate-bounce"></div>
      
      {/* Floating dental icons */}
      <div className="absolute top-1/4 left-1/4 opacity-10">
        <div className="w-24 h-24 bg-dental-blue rounded-full flex items-center justify-center animate-float">
          <Sparkles size={32} className="text-white" />
        </div>
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10">
        <div className="w-20 h-20 bg-dental-mint rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
          <Shield size={28} className="text-dental-dark-blue" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left side - Image with dental-themed frame */}
          <div className="flex-1 w-full">
            <div className="relative">
              {/* Decorative dental-themed border */}
              <div className="absolute -inset-4 bg-gradient-to-r from-dental-blue to-dental-light-blue rounded-3xl opacity-20 blur-lg"></div>
              <div className="absolute -inset-2 border-4 border-dental-blue/30 rounded-2xl"></div>
              
              <img
                src={imageUrl}
                alt="Modern dental office"
                className="relative w-full h-[500px] lg:h-[600px] object-cover rounded-2xl shadow-2xl border-4 border-white"
              />
              
              {/* Floating dental badges */}
              <div className="absolute -top-6 -right-6 bg-white rounded-full p-4 shadow-lg border-4 border-dental-mint">
                <Award className="text-dental-blue" size={24} />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-dental-blue rounded-full p-4 shadow-lg">
                <Sparkles className="text-white" size={24} />
              </div>
            </div>
          </div>

          {/* Right side - Content with dental-themed styling */}
          <div className="flex-1 w-full">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight relative z-10">
                    Your Perfect
                    <span className="text-dental-blue relative">
                      {" "}Smile
                      <div className="absolute -bottom-2 left-0 w-full h-3 bg-dental-mint/40 -z-10 rounded-full"></div>
                    </span>
                    <br />
                    Starts Here.
                  </h1>
                  {/* Decorative tooth-like shapes */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-dental-light-blue/20 rounded-full"></div>
                  <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-dental-mint/30 rounded-full"></div>
                </div>
                
                <div className="relative bg-gradient-to-r from-dental-mint/10 to-dental-light-blue/10 p-6 rounded-2xl border border-dental-blue/20">
                  <p className="text-xl text-gray-700 max-w-2xl font-bold leading-relaxed" style={{ fontFamily: "'Playpen Sans', cursive" }}>
                    "Quality with Utmost Care is Our Motto. We Provide Comprehensive Dental Care Where Your Smile Meets Expertise"
                  </p>
                  <div className="absolute top-2 right-2 w-4 h-4 bg-dental-blue/20 rounded-full"></div>
                </div>
              </div>

              {/* Address and Time Information with dental-themed cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-lg border-l-4 border-dental-blue hover:shadow-xl transition-shadow">
                  <MapPin className="text-dental-blue mt-1 flex-shrink-0" size={20} />
                  <div>
                    <p className="font-semibold text-gray-900">Our Location</p>
                    <p className="text-gray-600">Dr. Prabha's Dental Clinic, Vanagaram, Chennai</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-lg border-l-4 border-dental-mint hover:shadow-xl transition-shadow">
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
                  className="bg-gradient-to-r from-dental-blue to-dental-light-blue hover:from-dental-dark-blue hover:to-dental-blue shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                >
                  <Phone className="mr-2" size={18} />
                  Book Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
