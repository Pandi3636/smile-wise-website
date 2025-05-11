
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import DoctorTips from "@/components/DoctorTips";
import Services from "@/components/Services";
import TrainingVideos from "@/components/TrainingVideos";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <DoctorTips />
        <Services />
        <TrainingVideos />
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
