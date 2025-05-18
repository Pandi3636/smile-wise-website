import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InstagramSection from "@/components/InstagramSection";
import Navbar from "@/components/Navbar";
// import TeethViewSection from "@/components/TeethViewSection";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import EMISection from "@/components/EMISection";
import AppointmentBookingSection from "@/components/AppointmentBookingSection";
import DoctorTipsSection from "@/components/DoctorTipsSection";

const Index = () => {
  const heroImageUrl = "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//WhatsApp%20Image%202025-05-17%20at%2021.37.31.jpeg"; // Get the hero image URL

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url('${heroImageUrl}')` }}
    >
      <Navbar />
      {/* HeroSection will now primarily serve as the content layer over the fixed background */}
      <HeroSection />
      {/* This div provides the white background for sections scrolling over the fixed hero image */}
      <div className="relative z-10 bg-white">
        <Services/>
        <Gallery/>
        <DoctorTipsSection />
        <AppointmentBookingSection />
        <InstagramSection />
        <EMISection />
        <FAQ/>
        {/* <TeethViewSection /> */}
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
