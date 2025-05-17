
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InstagramSection from "@/components/InstagramSection";
import Navbar from "@/components/Navbar";
import ScheduleVisitSection from "@/components/ScheduleVisitSection";
import TeethViewSection from "@/components/TeethViewSection";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import EMISection from "@/components/EMISection";
import AboutSection from "@/components/AboutSection";
import AppointmentBookingSection from "@/components/AppointmentBookingSection";
import DoctorTipsSection from "@/components/DoctorTipsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Services/>
      <Gallery/>
      <AboutSection />
      <AppointmentBookingSection />
      <ScheduleVisitSection />
      <DoctorTipsSection />
      <FAQ/>
      <EMISection />
      <InstagramSection />
      <TeethViewSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
