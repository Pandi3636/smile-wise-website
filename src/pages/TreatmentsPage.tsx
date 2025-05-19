import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

// Import the treatments data from TreatmentPage
import { treatments } from "@/pages/TreatmentPage";

const TreatmentsPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-dental-dark-blue">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Dental Treatments</h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Discover our comprehensive range of dental treatments designed to give you the healthy, beautiful smile you deserve.
          </p>
        </div>
      </div>

      {/* Treatments Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(treatments).map(([slug, treatment]) => (
            <Link 
              key={slug} 
              to={`/treatment/${slug}`}
              className="block group"
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
                <div className="relative h-48">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-dental-dark-gray mb-3 group-hover:text-dental-blue transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {treatment.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {treatment.benefits.slice(0, 2).map((benefit, index) => (
                      <span 
                        key={index}
                        className="text-sm bg-dental-light-blue/10 text-dental-blue px-3 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-dental-light-blue/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold text-dental-dark-gray mb-4">
            Not Sure Which Treatment You Need?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our experienced team is here to help you choose the right treatment for your needs. 
            Book a consultation today and let us guide you through your options.
          </p>
          <a
            href="https://wa.me/919597876632"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-dental-blue hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TreatmentsPage; 