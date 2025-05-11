
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import DentalTechnologiesSection from "@/components/DentalTechnologiesSection";
import EmergencyCareSection from "@/components/EmergencyCareSection";

const ServicesPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <ServicesSection />
        <DentalTechnologiesSection />
        <EmergencyCareSection />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
