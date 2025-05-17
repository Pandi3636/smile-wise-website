
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import InstagramSection from "@/components/InstagramSection";
import Navbar from "@/components/Navbar";
import ScheduleVisitSection from "@/components/ScheduleVisitSection";
// import ServicesHighlightsSection from "@/components/ServicesHighlightsSection";
import TeethViewSection from "@/components/TeethViewSection";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import EMISection from "@/components/EMISection";
import AboutSection from "@/components/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Services/>
      <Gallery/>
      <AboutSection />
      <ScheduleVisitSection />
      <InstagramSection />
      <TeethViewSection />
      <FAQ/>
      <EMISection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
