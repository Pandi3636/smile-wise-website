
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DoctorDataTips from "./DoctorDataTips";

const DoctorTipDetail = () => {
  const { id } = useParams();
  const tips = DoctorDataTips();
  const tip = tips.find((tip) => tip.id === id);

  if (!tip) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <h1 className="text-2xl font-bold">Tip not found</h1>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{tip.title}</h1>
          <img
            src={tip.image}
            alt={tip.title}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          <div className="prose max-w-none">
            <p className="text-gray-700">{tip.content}</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorTipDetail;
