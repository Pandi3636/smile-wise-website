import { useParams } from "react-router-dom";
import doctorTips  from "./DoctorTipsPage";

const DoctorTipDetail = () => {
  const { slug } = useParams();
  const tip = doctorTips.find((tip) => tip.slug === slug);

  if (!tip) {
    return <p className="text-center text-red-500 mt-8">Tip not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <img src={tip.image} alt={tip.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-3xl font-bold text-dental-dark-gray mb-4">{tip.title}</h1>
      <p className="text-gray-700">{tip.description}</p>
    </div>
  );
};

export default DoctorTipDetail;
