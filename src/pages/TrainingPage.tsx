
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TrainingSection from "@/components/TrainingSection";

const TrainingPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <TrainingSection />
      </div>
      <Footer />
    </div>
  );
};

export default TrainingPage;
