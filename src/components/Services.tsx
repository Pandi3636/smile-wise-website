
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Smile, AlignHorizontalJustifyStart } from "lucide-react";

const serviceItems = [
  {
    icon: <Smile className="w-10 h-10 text-dental-blue" />,
    title: "General Dentistry",
    description: "Routine exams, cleanings, fillings, and preventive care for long-term oral health."
  },
  {
    icon: <Smile className="w-10 h-10 text-dental-blue" />,
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and smile makeovers to enhance your confidence."
  },
  {
    icon: <Calendar className="w-10 h-10 text-dental-blue" />,
    title: "Restorative Dentistry",
    description: "Crowns, bridges, dentures, and implants to restore your teeth and bite."
  },
  {
    icon: <AlignHorizontalJustifyStart className="w-10 h-10 text-dental-blue" />,
    title: "Orthodontics",
    description: "Braces and clear aligners to straighten teeth and correct bite issues."
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
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 border-none">
              <CardHeader className="pb-2">
                <div className="text-4xl mb-4">{service.icon}</div>
                <CardTitle className="text-xl text-dental-purple-dark group-hover:text-dental-purple transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
