
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Clock, MapPin, Sparkles, Shield, Award } from "lucide-react";

// Use a sample image for demonstration (dental-themed)
const SAMPLE_IMAGE = "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80";

const HeroSection = () => {
  const clinicPhoneNumber = "+919597876632";
  const handlePhoneCall = () => {
    window.location.href = `tel:${clinicPhoneNumber}`;
  };

  useEffect(() => {
    const img = new Image();
    img.src = SAMPLE_IMAGE;
  }, []);

  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-center py-12 md:py-28 overflow-hidden bg-gradient-to-br from-dental-mint/40 via-white to-dental-blue/10">
      {/* Dentist-Themed Background decorations */}
      <div className="absolute top-4 left-8 w-40 h-40 bg-dental-mint/30 rounded-full blur-xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-4 border-dental-blue/20 rounded-full animate-pulse pointer-events-none" />
      {/* Tooth Shape Decorative */}
      <div className="absolute top-1/4 left-1/3 opacity-10 select-none pointer-events-none hidden md:block">
        <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
          <ellipse cx="45" cy="45" rx="40" ry="25" fill="#A7F3D0" />
        </svg>
      </div>
      {/* Floating dentist icons */}
      <div className="absolute top-14 right-[15%] z-0 opacity-20 animate-float hidden md:block">
        <div className="w-20 h-20 bg-dental-light-mint rounded-full flex items-center justify-center shadow-lg animate-float">
          <Shield size={32} className="text-dental-dark-blue" />
        </div>
      </div>
      <div className="absolute bottom-6 left-10 opacity-20 animate-float hidden md:block">
        <div className="w-16 h-16 bg-dental-blue rounded-full flex items-center justify-center">
          <Sparkles size={28} className="text-white" />
        </div>
      </div>
      {/* --- End BG Stuff --- */}


      <div className="container relative mx-auto px-4 z-10 flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-20">
        {/* Left: Main Image with decorative frame/badges */}
        <div className="flex-1 w-full flex flex-col justify-center items-center relative min-w-[300px]">
          <div className="relative group">
            {/* Main Dental-themed border */}
            <div className="absolute -inset-6 md:-inset-8 -z-10 rounded-3xl bg-gradient-to-br from-dental-blue/20 to-dental-mint/20 blur-md opacity-80 shadow-md"></div>
            <div className="absolute -inset-1 rounded-2xl border-4 border-dental-light-mint/40 -z-10" />
            <img
              src={SAMPLE_IMAGE}
              alt="Friendly Dentist at Work"
              className="w-[320px] h-[400px] md:w-[380px] md:h-[510px] object-cover rounded-2xl border-4 border-white shadow-2xl scale-105 hover:scale-110 transition-transform duration-500"
              style={{ maxWidth: 380, maxHeight: 510, background: "#A7F3D0" }}
              draggable={false}
            />

            {/* Floating Badges (Awards & Sparkle) */}
            <div className="absolute -top-8 -right-8 bg-white rounded-full p-4 shadow-lg border-4 border-dental-mint">
              <Award className="text-dental-blue" size={28} />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-dental-blue rounded-full p-4 shadow-lg">
              <Sparkles className="text-white" size={28} />
            </div>
          </div>
        </div>

        {/* Right: Main Content */}
        <div className="flex-1 w-full flex flex-col justify-center">
          <div className="space-y-7">
            {/* Animated Dentist Icon */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-dental-mint text-dental-dark-blue shadow-lg animate-pulse">
                <svg height="32" width="32" viewBox="0 0 40 40" className="inline">
                  <ellipse cx="20" cy="20" rx="18" ry="10" fill="#0EA5E9" />
                  <ellipse cx="15" cy="28" rx="4" ry="7" fill="white" />
                  <ellipse cx="25" cy="28" rx="4" ry="7" fill="white" />
                </svg>
              </span>
              <span className="ml-2 text-dental-dark-blue font-semibold text-lg tracking-wide">Where Dentist Expertise Meets Care</span>
            </div>
            {/* Main Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight relative tracking-tight font-poppins mb-1">
              Discover Your
              <span className="relative text-dental-blue px-3">
                {" "}Perfect Smile
                <span className="absolute -bottom-1 left-0 w-full h-2 bg-dental-mint/30 rounded-full -z-10"></span>
              </span>
              <br className="hidden md:block" />
              Today
            </h1>
            {/* Quote */}
            <div className="relative bg-gradient-to-r from-dental-mint/40 to-dental-blue/10 p-5 rounded-xl border border-dental-light-blue/30 shadow-sm">
              <p className="text-lg text-gray-700 leading-relaxed font-semibold font-raleway">
                "Quality with Utmost Care is Our Motto. We Provide Comprehensive Dental Care Where Your Smile Meets Expertise"
              </p>
              <span className="absolute top-3 right-3 w-3 h-3 bg-dental-mint/30 rounded-full" />
            </div>
            {/* Address & Time Cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow border-l-4 border-dental-blue hover:shadow-lg transition-shadow">
                <MapPin className="text-dental-blue mt-1 flex-shrink-0" size={22} />
                <div>
                  <p className="font-semibold text-gray-900">Our Location</p>
                  <p className="text-gray-600">Dr. Prabha's Dental Clinic, Vanagaram, Chennai</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/70 p-4 rounded-xl shadow border-l-4 border-dental-mint hover:shadow-lg transition-shadow">
                <Clock className="text-dental-blue mt-1 flex-shrink-0" size={22} />
                <div>
                  <p className="font-semibold text-gray-900">Clinic Hours</p>
                  <p className="text-gray-600">Mon - Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            {/* Book Button */}
            <div className="flex gap-3 mt-2">
              <Button
                size="lg"
                onClick={handlePhoneCall}
                className="bg-gradient-to-r from-dental-blue to-dental-light-blue hover:from-dental-dark-blue hover:to-dental-blue shadow-lg hover-scale border-none"
              >
                <Phone size={20} className="mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Animation keyframes via Tailwind utility (see tailwind.config) */}
      {/* 
        Add this to tailwind.config if not present:
        keyframes: {
            float: {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-16px)' }
            }
        },
        animation: {
            float: 'float 3s ease-in-out infinite'
        }
      */}
    </section>
  );
};

export default HeroSection;

