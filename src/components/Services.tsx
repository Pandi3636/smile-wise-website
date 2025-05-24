
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
    slug: "General Dentistry",
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
    image: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "Orthodontics",
  },
  {
    title: "Root Canal Treatment",
    description:
      "Save your natural tooth and relieve pain with our gentle and effective root canal treatments.",
    image:
      "https://images.pexels.com/photos/4971514/pexels-photo-4971514.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "Root Canal Treatment",
  },
  {
    title: "Dental Implants",
    description:
      "Replace missing teeth with dental implants that look, feel, and function like your natural teeth.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//e04266cb-4ab8-4447-ab95-18f657a996f8.jpg",
    slug: "Dental Implants",
  },
  {
    title: "Children's Dentistry",
    description:
      "Specialized dental care for children in a friendly, comfortable environment to establish good oral health habits early.",
    image:
      "https://images.pexels.com/photos/7789705/pexels-photo-7789705.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "Children's Dentistry",
  },
  {
    title: "Laser Dentistry",
    description:
      "Advanced laser technology for more comfortable and precise dental procedures with faster healing times.",
    image:
      "https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "Laser Dentistry",
  },
  {
    title: "Smile Corrections",
    description:
      "Comprehensive smile makeover services to address multiple aesthetic concerns and give you the smile of your dreams.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//a1e4ee3c-0291-414e-8f33-ed94bba464df.jpg',
    slug: "Smile Corrections",
  },
  {
    title: "Reverse Aging Dentistry",
    description:
      "Comprehensive treatments focused on restoring youthful dental aesthetics and function, addressing issues like wear, discoloration, and volume loss.",
    image: 'https://images.pexels.com/photos/5622023/pexels-photo-5622023.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "reverse-aging-dentistry",
  },
  {
    title: "Crown in A Day",
    description:
      "Using CEREC technology to design, create, and place dental crowns in a single appointment, offering a fast and convenient restoration.",
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "crown-in-a-day",
  },
  {
    title: "digital-dentistry",
    description:
      "Leveraging digital tools and workflows for enhanced precision, efficiency, and patient experience in various dental procedures.",
    image:
      "https://images.pexels.com/photos/6502161/pexels-photo-6502161.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "digital-dentistry",
  },
  {
    title: "Zygoma Implants",
    description:
      "A specialized implant technique using the zygomatic bone to provide support for dental prosthetics, often used in cases of significant bone loss in the upper jaw.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//7e2fb975-ed49-41e6-91fb-b654e3592e1b.jpg',
    slug: "zygoma-implants",
  },
  {
    title: "Fixed Teeth Rehabilitation Within 3 days",
    description:
      "A rapid and efficient method to restore full arch dentition with fixed prosthetics, providing functional teeth shortly after implant placement.",
    image:
      "https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "fixed-teeth-rehabilitation-within-3-days",
  },
  {
    title: "Invisible braces - Aligners",
    description:
      "A discreet orthodontic treatment using a series of clear, custom-made aligners to gradually shift teeth into the desired position.",
    image:
      "https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "Dental Tourism",
  },
  {
    title: "dental-tourism",
    description:
      "Combining your dental treatment with a travel experience, offering high-quality dental care while visiting a new location.",
    image: 'https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "dental-tourism",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2 font-unifraktur">Our Dental Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of dental services to keep your smile healthy and bright.
            Our expert team uses the latest technology for your comfort.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceItems.map((service, index) => (
            <Link to={`/treatments/${service.slug}`} key={index}>
              <Card 
                className="group hover:shadow-lg transition-shadow duration-300 border-none relative overflow-hidden h-80"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${service.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <CardHeader className="pb-2 relative z-10">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-white group-hover:text-dental-mint transition-colors font-unifraktur">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-gray-200">{service.description}</CardDescription>
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
