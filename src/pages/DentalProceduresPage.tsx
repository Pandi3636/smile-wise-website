
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

// Dental procedures data organized by category
const dentalProcedures = {
  "general-specialized": {
    title: "General & Specialized Procedures",
    procedures: [
      {
        title: "Dental Obturators",
        slug: "dental-obturators",
        description: "Custom-made prosthetic devices that restore function and appearance after oral surgery.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Dental Consultation",
        slug: "dental-consultation",
        description: "Comprehensive oral health assessment and treatment planning.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Acrylic Prosthesis",
        slug: "acrylic-prosthesis",
        description: "Durable and aesthetic acrylic-based dental prosthetics.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Aesthetic Dentistry",
        slug: "aesthetic-dentistry",
        description: "Cosmetic treatments to enhance your smile's appearance.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "BPS Denture",
        slug: "bps-denture",
        description: "Bio-functional prosthetic system for superior comfort and function.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Ceramic Tooth",
        slug: "ceramic-tooth",
        description: "High-quality ceramic tooth restorations that mimic natural teeth perfectly.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "All On 4 Dental Implants",
        slug: "all-on-4-dental-implants",
        description: "Full arch restoration with just four strategically placed implants.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "CAD CAM Zirconia Crowns",
        slug: "cad-cam-zirconia-crowns",
        description: "Computer-aided design and manufacturing of premium zirconia crowns.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "All Ceramic Crowns with Warranty",
        slug: "all-ceramic-crowns-with-warranty",
        description: "Premium all-ceramic crowns with comprehensive warranty coverage.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Dental Smile Design",
        slug: "dental-smile-design",
        description: "Comprehensive smile makeover using digital planning and design.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Aesthetic Metal Free Crowns",
        slug: "aesthetic-metal-free-crowns",
        description: "Beautiful metal-free crowns for natural-looking restorations.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "All Prosthodontic Works",
        slug: "all-prosthodontic-works",
        description: "Comprehensive prosthodontic treatments for complete oral rehabilitation.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      }
    ]
  },
  "restorative-cosmetic": {
    title: "Restorative & Cosmetic Procedures",
    procedures: [
      {
        title: "3 Unit Bridge",
        slug: "3-unit-bridge",
        description: "Fixed dental prosthetic that replaces one or more missing teeth.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Composite Restorations",
        slug: "composite-restorations",
        description: "Tooth-colored fillings that restore function and aesthetics.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Alignment of Crooked & Protruding Teeth",
        slug: "alignment-of-crooked-protruding-teeth",
        description: "Orthodontic treatment to correct misaligned and protruding teeth.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Alginate Impressions",
        slug: "alginate-impressions",
        description: "Precise dental impressions for various prosthetic treatments.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Implant and Implant Prosthesis",
        slug: "implant-and-implant-prosthesis",
        description: "Complete implant solutions with custom prosthetic attachments.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Advanced Digital Diagnostics",
        slug: "advanced-digital-diagnostics",
        description: "State-of-the-art digital imaging and diagnostic tools.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "3M Lava & Procera Crown",
        slug: "3m-lava-procera-crown",
        description: "Premium crown systems for superior strength and aesthetics.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Cosmetic Dental Procedures",
        slug: "cosmetic-dental-procedures",
        description: "Comprehensive aesthetic treatments for smile enhancement.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Immediate Loading Implantology",
        slug: "immediate-loading-implantology",
        description: "Same-day implant placement with immediate prosthetic loading.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Dental Prosthetics",
        slug: "dental-prosthetics",
        description: "Custom-made devices to replace missing teeth and restore function.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Bleaching of Discolored Teeth",
        slug: "bleaching-of-discolored-teeth",
        description: "Professional teeth whitening for a brighter, confident smile.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Endodontic Dentistry",
        slug: "endodontic-dentistry",
        description: "Root canal treatments and pulp therapy procedures.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Computerised Digital X-Ray",
        slug: "computerised-digital-x-ray",
        description: "Advanced digital imaging for precise diagnosis and treatment planning.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      }
    ]
  },
  "treatments": {
    title: "Treatments",
    procedures: [
      {
        title: "BPS Dentures Fixing",
        slug: "bps-dentures-fixing",
        description: "Professional fitting and adjustment of BPS denture systems.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      }
    ]
  },
  "tests": {
    title: "Tests",
    procedures: [
      {
        title: "Dental Screening and Prophylaxis",
        slug: "dental-screening-and-prophylaxis",
        description: "Comprehensive dental examination and preventive cleaning.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      }
    ]
  },
  "procedures": {
    title: "Procedures",
    procedures: [
      {
        title: "Dental Laminates",
        slug: "dental-laminates",
        description: "Ultra-thin porcelain veneers for smile transformation.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Composite Bondings",
        slug: "composite-bondings",
        description: "Tooth-colored bonding for chips, gaps, and discoloration.",
        image: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Cast Partial Denture",
        slug: "cast-partial-denture",
        description: "Precision-cast partial dentures with metal framework.",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500"
      },
      {
        title: "Fixed Prosthodontics",
        slug: "fixed-prosthodontics",
        description: "Permanent prosthetic solutions including crowns and bridges.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=500"
      }
    ]
  }
};

const DentalProceduresPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-gradient-to-r from-dental-blue to-dental-light-blue">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Dental Procedures
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive dental procedures tailored to your specific needs, from general care to specialized treatments.
          </p>
        </div>
      </div>

      {/* Procedures by Category */}
      <div className="container mx-auto px-4 py-16">
        {Object.entries(dentalProcedures).map(([key, category]) => (
          <div key={key} className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-dental-blue" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
              {category.title}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.procedures.map((procedure) => (
                <Link 
                  key={procedure.slug} 
                  to={`/procedure/${procedure.slug}`}
                  className="block group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                    <div className="relative h-48">
                      <img
                        src={procedure.image}
                        alt={procedure.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-dental-dark-gray mb-3 group-hover:text-dental-blue transition-colors">
                        {procedure.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3">
                        {procedure.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-dental-light-blue/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-dental-dark-gray mb-4" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Ready to Transform Your Smile?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to provide you with the highest quality dental procedures. 
            Contact us today to schedule your consultation.
          </p>
          <a
            href="https://wa.me/919597876632"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dental-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Book Your Procedure
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DentalProceduresPage;
