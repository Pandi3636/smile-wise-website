
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Smile, AlignHorizontalJustifyStart } from "lucide-react";
import { Link } from "react-router-dom";

const serviceItems = [
  {
    title: "General Dentistry",
    description:
      "Our general dentistry services cover routine check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image:
      "https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "general-dentistry",
  },
  {
    title: "Cosmetic Dentistry",
    description:
      "Transform your smile with our cosmetic dentistry services including teeth whitening, veneers, and smile makeovers.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//3dccc5f0-11c7-4efa-8ba9-a1ad9da6f9b3.jpg",
    slug: "cosmetic-dentistry",
  },
  {
    title: "Orthodontics",
    description:
      "Straighten your teeth and correct bite issues with our modern orthodontic treatments including braces and clear aligners.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/dental-procedure-installing-braces-close-up-dentistry-braces-teeth_169016-67279.avif',
    slug: "orthodontics",
  },
  {
    title: "Root Canal Treatment",
    description:
      "Save your natural tooth and relieve pain with our gentle and effective root canal treatments.",
    image:
      "https://images.pexels.com/photos/4971514/pexels-photo-4971514.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "root-canal",
  },
  {
    title: "Dental Implants",
    description:
      "Replace missing teeth with dental implants that look, feel, and function like your natural teeth.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//e04266cb-4ab8-4447-ab95-18f657a996f8.jpg",
    slug: "implants",
  },
  {
    title: "Children's Dentistry",
    description:
      "Specialized dental care for children in a friendly, comfortable environment to establish good oral health habits early.",
    image:
      "https://images.pexels.com/photos/7789705/pexels-photo-7789705.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "childrens-dentistry",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
            Our Dental Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of dental services to keep your smile healthy and bright.
            Our expert team uses the latest technology for your comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((service, index) => (
            <Link to={`/service/${service.slug}`} key={index}>
              <Card className="group hover:shadow-lg transition-shadow duration-300 border-none relative overflow-hidden h-80">
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardHeader className="pb-2 relative z-10">
                  <CardTitle className="text-xl text-dental-dark-gray group-hover:text-dental-blue transition-colors" style={{ fontFamily: "'UnifrakturCook', cursive" }}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  <div className="mt-4 text-dental-blue">
                    <span className="text-sm font-medium">Learn more</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
