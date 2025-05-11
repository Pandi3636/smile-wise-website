
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

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <Services/>
      <Gallery/>
      <ScheduleVisitSection />
      <InstagramSection />
      <TeethViewSection />
      <ContactSection />
      <FAQ/>
      <Footer />
    </div>
  );
};

export default Index;
