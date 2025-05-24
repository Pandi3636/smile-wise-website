import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InstagramSection from "@/components/InstagramSection";
import Navbar from "@/components/Navbar";
// import TeethViewSection from "@/components/TeethViewSection";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Gallery from "@/components/Gallery";
import EMISection from "@/components/EMISection";
import AppointmentBookingSection from "@/components/AppointmentBookingSection";
// import DoctorTipsSection from "@/components/DoctorTipsSection";
import DentalServices from "@/components/DentalServices";
import Teeth3DView from "@/components/Teeth3DView";

const Index = () => {

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed">
      <Navbar />
      <div className="fixed bottom-0 left-0 right-0 w-full bg-dental-blue z-50">
  <div className="text-center whitespace-nowrap overflow-hidden">
    <span className="text-1xl text-white inline-block px-3 py-2" style={{ fontFamily: "'Playpen Sans', cursive" }} >
      Dr Prabha's Dentistry - Where Your Smile Meets Expertise
    </span>
  </div>
</div>
      <HeroSection />
      <div className="relative z-10 bg-white">
        <DentalServices />
        <Gallery/>
        {/* <DoctorTipsSection /> */}
        <Teeth3DView />
        <AppointmentBookingSection />
        <InstagramSection />
        <EMISection />
        <FAQ/>
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
