
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Award, Users } from "lucide-react";

// Comprehensive procedure data
const procedureData: Record<string, any> = {
  "dental-obturators": {
    title: "Dental Obturators",
    description: "Custom-made prosthetic devices that restore function and appearance after oral surgery or congenital defects.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    category: "General & Specialized Procedures",
    duration: "2-3 appointments",
    benefits: [
      "Restores speech clarity",
      "Improves swallowing function",
      "Enhances facial appearance",
      "Custom-fitted for comfort",
      "Durable and long-lasting"
    ],
    process: [
      "Initial consultation and assessment",
      "Precise impressions and measurements",
      "Custom fabrication in dental lab",
      "Fitting and adjustments",
      "Follow-up care and maintenance"
    ]
  },
  "dental-consultation": {
    title: "Dental Consultation",
    description: "Comprehensive oral health assessment and personalized treatment planning for optimal dental care.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    category: "General & Specialized Procedures",
    duration: "60-90 minutes",
    benefits: [
      "Complete oral health evaluation",
      "Early detection of dental issues",
      "Personalized treatment plan",
      "Professional oral hygiene guidance",
      "Cost-effective preventive care"
    ],
    process: [
      "Medical and dental history review",
      "Comprehensive oral examination",
      "Digital X-rays if needed",
      "Treatment plan discussion",
      "Scheduling of recommended procedures"
    ]
  },
  "bps-denture": {
    title: "BPS Dentures",
    type: "Treatment",
    description: "Bio-functional prosthetic system dentures that provide superior comfort, function, and natural appearance.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    category: "General & Specialized Procedures",
    duration: "4-6 appointments",
    benefits: [
      "Superior retention and stability",
      "Natural chewing function",
      "Enhanced speech clarity",
      "Comfortable fit",
      "Aesthetic natural appearance",
      "Long-lasting durability"
    ],
    process: [
      "Initial assessment and consultation",
      "Precise jaw relationship recording",
      "Tooth selection and arrangement",
      "Try-in and adjustments",
      "Final delivery and fitting",
      "Follow-up care and maintenance"
    ]
  },
  "bleaching-of-discolored-teeth": {
    title: "Bleaching of Discolored Teeth",
    type: "Procedure",
    description: "Professional teeth whitening treatment to brighten discolored teeth and enhance your smile.",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    category: "Restorative & Cosmetic Procedures",
    duration: "1-2 sessions",
    benefits: [
      "Significantly whiter teeth",
      "Removes stains and discoloration",
      "Boosts confidence",
      "Safe and effective treatment",
      "Long-lasting results"
    ],
    process: [
      "Consultation and shade assessment",
      "Teeth cleaning and preparation",
      "Application of whitening gel",
      "Activation with special light",
      "Post-treatment care instructions"
    ]
  },
  "composite-restorations": {
    title: "Composite Restorations (Tooth Coloured Fillings)",
    type: "Procedure",
    description: "Modern tooth-colored fillings that restore damaged teeth while maintaining natural appearance.",
    image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800",
    category: "Restorative & Cosmetic Procedures",
    duration: "30-60 minutes per tooth",
    benefits: [
      "Natural tooth-like appearance",
      "Mercury-free material",
      "Bonds strongly to tooth structure",
      "Preserves more natural tooth",
      "Immediate restoration"
    ],
    process: [
      "Local anesthesia application",
      "Removal of decay or old filling",
      "Tooth preparation and cleaning",
      "Composite material application",
      "Shaping and polishing"
    ]
  },
  "dental-laminates": {
    title: "Dental Laminates",
    type: "Procedure",
    description: "Ultra-thin porcelain veneers that transform your smile with minimal tooth preparation.",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    category: "Restorative & Cosmetic Procedures",
    duration: "2-3 appointments",
    benefits: [
      "Natural-looking results",
      "Stain-resistant material",
      "Minimal tooth reduction",
      "Long-lasting durability",
      "Improved smile aesthetics"
    ],
    process: [
      "Consultation and smile design",
      "Minimal tooth preparation",
      "Impression taking",
      "Temporary restoration",
      "Final laminate bonding"
    ]
  }
};

const ProcedureDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const procedure = slug ? procedureData[slug] : null;

  if (!procedure) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Procedure Not Found</h1>
          <p className="text-gray-600">The requested procedure could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm text-dental-blue font-medium mb-2">
                {procedure.category} • {procedure.type || "Treatment"}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-dental-dark-gray mb-6" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
                {procedure.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                {procedure.description}
              </p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="text-dental-blue" size={20} />
                  <span className="text-gray-600">{procedure.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-dental-blue" size={20} />
                  <span className="text-gray-600">Expert Care</span>
                </div>
              </div>
              <a
                href="https://wa.me/919597876632"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-dental-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Book Consultation
              </a>
            </div>
            <div className="relative">
              <img
                src={procedure.image}
                alt={procedure.title}
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dental-blue" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedure.benefits.map((benefit: string, index: number) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-dental-blue mt-1 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dental-blue" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Treatment Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {procedure.process.map((step: string, index: number) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-dental-blue text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-700 text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-dental-blue py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact Dr. Prabha's Dentistry today to schedule your consultation and take the first step 
            towards achieving your perfect smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/919597876632"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-dental-blue hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              WhatsApp Consultation
            </a>
            <a
              href="tel:+919597876632"
              className="border-2 border-white text-white hover:bg-white hover:text-dental-blue font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Call Now
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProcedureDetailPage;
