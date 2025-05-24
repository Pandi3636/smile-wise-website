
import React from "react";
import { Link } from "react-router-dom";
import { 
  Stethoscope, 
  Smile, 
  Shield, 
  Heart, 
  Zap, 
  Crown,
  Sparkles,
  Eye,
  Activity,
  Settings,
  Users,
  Clock
} from "lucide-react";

const dentalProcedures = [
  {
    title: "Dental Obturators",
    slug: "dental-obturators",
    icon: Shield,
    category: "General & Specialized"
  },
  {
    title: "Dental Consultation",
    slug: "dental-consultation",
    icon: Stethoscope,
    category: "General & Specialized"
  },
  {
    title: "Acrylic Prosthesis",
    slug: "acrylic-prosthesis",
    icon: Settings,
    category: "General & Specialized"
  },
  {
    title: "Aesthetic Dentistry",
    slug: "aesthetic-dentistry",
    icon: Sparkles,
    category: "General & Specialized"
  },
  {
    title: "BPS Denture",
    slug: "bps-denture",
    icon: Crown,
    category: "General & Specialized"
  },
  {
    title: "Ceramic Tooth",
    slug: "ceramic-tooth",
    icon: Heart,
    category: "General & Specialized"
  },
  {
    title: "All On 4 Dental Implants",
    slug: "all-on-4-dental-implants",
    icon: Zap,
    category: "General & Specialized"
  },
  {
    title: "CAD CAM Zirconia Crowns",
    slug: "cad-cam-zirconia-crowns",
    icon: Settings,
    category: "General & Specialized"
  },
  {
    title: "3 Unit Bridge",
    slug: "3-unit-bridge",
    icon: Activity,
    category: "Restorative & Cosmetic"
  },
  {
    title: "Composite Restorations",
    slug: "composite-restorations",
    icon: Smile,
    category: "Restorative & Cosmetic"
  },
  {
    title: "Dental Implants",
    slug: "implant-and-implant-prosthesis",
    icon: Crown,
    category: "Restorative & Cosmetic"
  },
  {
    title: "Teeth Whitening",
    slug: "bleaching-of-discolored-teeth",
    icon: Sparkles,
    category: "Restorative & Cosmetic"
  }
];

const DentalProceduresHomeSection = () => {
  return (
    <section className="py-16 bg-dental-light-blue/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-dark-gray mb-4" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Our Dental Procedures
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive dental procedures using the latest technology and techniques for optimal oral health.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {dentalProcedures.map((procedure) => {
            const IconComponent = procedure.icon;
            return (
              <Link 
                key={procedure.slug}
                to={`/procedure/${procedure.slug}`}
                className="group"
              >
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center group-hover:border-dental-blue">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-dental-blue/10 rounded-full flex items-center justify-center group-hover:bg-dental-blue group-hover:text-white transition-colors">
                      <IconComponent className="w-8 h-8 text-dental-blue group-hover:text-white" />
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-dental-dark-gray group-hover:text-dental-blue transition-colors mb-2">
                    {procedure.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {procedure.category}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/dental-procedures"
            className="inline-flex items-center bg-dental-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            View All Procedures
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DentalProceduresHomeSection;
