
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import DoctorTipsSection from "@/components/DoctorTipsSection";
import OralHygieneSection from "@/components/OralHygieneSection";

const DoctorTipsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <DoctorTipsSection />
        <OralHygieneSection />
      </div>
      <Footer />
    </div>
  );
};

export default DoctorTipsPage;
