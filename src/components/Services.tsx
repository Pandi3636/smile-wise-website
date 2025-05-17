
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Smile, AlignHorizontalJustifyStart } from "lucide-react";

const serviceItems = [
  {
    icon: <Smile className="w-10 h-10 text-white" />,
    title: "General Dentistry",
    description: "Routine exams, cleanings, fillings, and preventive care for long-term oral health.",
    bgImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    icon: <Smile className="w-10 h-10 text-white" />,
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and smile makeovers to enhance your confidence.",
    bgImage: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    icon: <Calendar className="w-10 h-10 text-white" />,
    title: "Restorative Dentistry",
    description: "Crowns, bridges, dentures, and implants to restore your teeth and bite.",
    bgImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  },
  {
    icon: <AlignHorizontalJustifyStart className="w-10 h-10 text-white" />,
    title: "Orthodontics",
    description: "Braces and clear aligners to straighten teeth and correct bite issues.",
    bgImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">Our Dental Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of dental services to keep your smile healthy and bright.
            Our expert team uses the latest technology for your comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-shadow duration-300 border-none relative overflow-hidden h-80"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${service.bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <CardHeader className="pb-2 relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-white group-hover:text-dental-mint transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <CardDescription className="text-gray-200">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
