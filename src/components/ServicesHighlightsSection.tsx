
import { Button } from "@/components/ui/button";
import { Calendar, Phone, User } from "lucide-react";

const servicesHighlights = [
  {
    id: 1,
    title: "General Dentistry",
    description: "Comprehensive check-ups, cleanings, and preventative care.",
    icon: <Calendar className="w-10 h-10 text-dental-blue" />
  },
  {
    id: 2,
    title: "Cosmetic Solutions",
    description: "Enhance your smile with our advanced cosmetic procedures.",
    icon: <User className="w-10 h-10 text-dental-blue" />
  },
  {
    id: 3,
    title: "Quick Appointments",
    description: "Book your visit through WhatsApp for convenience.",
    icon: <Phone className="w-10 h-10 text-dental-blue" />
  }
];

const ServicesHighlightsSection = () => {
  return (
    <section id="services" className="">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive dental care services to meet all your oral health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {servicesHighlights.map((service) => (
            <div 
              key={service.id} 
              className="bg-dental-light-blue/10 p-8 rounded-lg text-center hover:shadow-md transition-all group hover:bg-dental-blue hover:text-white"
            >
              <div className="flex justify-center mb-4 bg-white rounded-full w-16 h-16 mx-auto items-center group-hover:bg-dental-light-blue">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="group-hover:text-white/90">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg" className="bg-dental-blue hover:bg-blue-600 shadow-md">
            <a href="/services">View All Services</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlightsSection;
