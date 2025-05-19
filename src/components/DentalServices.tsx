import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from 'lucide-react';


const services = [
  {
    title: "General Dentistry",
    description: "Our general dentistry services cover routine check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image: 'https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "General Dentistry"
  },
  {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our cosmetic dentistry services including teeth whitening, veneers, and smile makeovers.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//3dccc5f0-11c7-4efa-8ba9-a1ad9da6f9b3.jpg',
    slug: "cosmetic-dentistry"
  },
  {
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with our modern orthodontic treatments including braces and clear aligners.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    slug: "Orthodontics"
  },
  {
    title: "Root Canal Treatment",
    description: "Save your natural tooth and relieve pain with our gentle and effective root canal treatments.",
    image: 'https://images.pexels.com/photos/4971514/pexels-photo-4971514.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "Root Canal Treatment"
  },
  {
    title: "Dental Implants",
    description: "Replace missing teeth with dental implants that look, feel, and function like your natural teeth.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//e04266cb-4ab8-4447-ab95-18f657a996f8.jpg',
    slug: "Dental Implants"
  },
  {
    title: "Children's Dentistry",
    description: "Specialized dental care for children in a friendly, comfortable environment to establish good oral health habits early.",
    image: 'https://images.pexels.com/photos/7789705/pexels-photo-7789705.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "Children's Dentistry"
  },
  {
    title: "Laser Dentistry",
    description: "Advanced laser technology for more comfortable and precise dental procedures with faster healing times.",
    image: 'https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "Laser Dentistry"
  },
  {
    title: "Smile Corrections",
    description: "Comprehensive smile makeover services to address multiple aesthetic concerns and give you the smile of your dreams.",
    image: "https://images.unsplash.com/photo-1581263518256-ba4a28ed5517?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    slug: "Smile Corrections"
  },
  {
    title: "Reverse Aging Dentistry",
    description: 'Comprehensive treatments focused on restoring youthful dental aesthetics and function, addressing issues like wear, discoloration, and volume loss.',
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//a1e4ee3c-0291-414e-8f33-ed94bba464df.jpg',
    slug: "reverse-aging-dentistry"
  },
  {
    title: "Crown in A Day",
    description: 'Using CEREC technology to design, create, and place dental crowns in a single appointment, offering a fast and convenient restoration.',
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "crown-in-a-day"
  },
  {
    title: "digital-dentistry",
    description: 'Leveraging digital tools and workflows for enhanced precision, efficiency, and patient experience in various dental procedures.',
    image: 'https://images.pexels.com/photos/6502161/pexels-photo-6502161.jpeg?auto=compress&cs=tinysrgb&w=600',
    slug: "digital-dentistry"
  },
  {
    title: "Zygoma Implants",
    description: 'A specialized implant technique using the zygomatic bone to provide support for dental prosthetics, often used in cases of significant bone loss in the upper jaw.',
    image: 'https://images.unsplash.com/photo-1546519638-68e1b0df096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',

    slug: "zygoma-implants"
  },
  {
    title: "Fixed Teeth Rehabilitation Within 3 days",
    description: 'A rapid and efficient method to restore full arch dentition with fixed prosthetics, providing functional teeth shortly after implant placement.',
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',

    slug: "fixed-teeth-rehabilitation-within-3-days"
  },
  {
    title: "Invisible braces - Aligners",
    description: 'A discreet orthodontic treatment using a series of clear, custom-made aligners to gradually shift teeth into the desired position.',
    image: 'https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600',

    slug: "Dental Tourism"
  },
  {
    title: "Laser Dentistry",
    description: 'Combining your dental treatment with a travel experience, offering high-quality dental care while visiting a new location.',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a779c6c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',

    slug: "dental-tourism"
  },
];

const DentalServices: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins text-dental-dark-blue">
          Our Dental Services
        </h2>

        {/* Arrow Controls */}
        <button
          onClick={() => {
            const cardWidth = cardRef.current?.offsetWidth || 600;
            if (scrollRef.current) scrollRef.current.scrollLeft -= cardWidth;
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-dental-dark-blue" />
        </button>

        <button
          onClick={() => {
            const cardWidth = cardRef.current?.offsetWidth || 600;
            if (scrollRef.current) scrollRef.current.scrollLeft += cardWidth;
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-dental-dark-blue" />
        </button>

        {/* Services Scroll Area */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 py-4 cursor-grab scroll-smooth"
        >
          {[...services, ...services].map((service, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-[600px] h-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/treatments/${service.slug}`)}
            >
              <div className="flex h-full">
                <div className="w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 font-poppins text-dental-dark-blue">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 font-raleway mb-4">
                      {service.description}
                    </p>
                  </div>
                  <span className="text-dental-blue font-semibold">Learn more →</span>
                </div>

                <div className="w-1/2 h-full">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

  );
};

export default DentalServices; 