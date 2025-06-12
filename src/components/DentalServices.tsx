import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

const services = [
  {
    title: "General Dentistry",
    description:
      "Our general dentistry services cover routine check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/photo-1606811971618-4486d14f3f99.jpg",
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
  {
    title: "Laser Dentistry",
    description:
      "Advanced laser technology for more comfortable and precise dental procedures with faster healing times.",
    image:
      "https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600",
    slug: "laser-dentistry",
  },
  {
    title: "Smile Corrections",
    description:
      "Comprehensive smile makeover services to address multiple aesthetic concerns and give you the smile of your dreams.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//a1e4ee3c-0291-414e-8f33-ed94bba464df.jpg',
    slug: "smile-corrections",
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
    title: "Digital-dentistry",
    description:
      "Leveraging digital tools and workflows for enhanced precision, efficiency, and patient experience in various dental procedures.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/istockphoto-1252962000-612x612.jpg",
    slug: "digital-dentistry",
  },
  {
    title: "Zygoma Implants",
    description:
      "A specialized implant technique using the zygomatic bone to provide support for dental prosthetics, often used in cases of significant bone loss in the upper jaw.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/Zygomatic-Implants-1024x683.jpg',
    slug: "zygoma-implants",
  },
  {
    title: "Fixed Teeth Rehabilitation Within 3 days",
    description:
      "A rapid and efficient method to restore full arch dentition with fixed prosthetics, providing functional teeth shortly after implant placement.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/full-mouth-rehabilitation-by-crowns-260nw-2113128206.webp",
    slug: "fixed-teeth-rehabilitation-within-3-days",
  },
  {
    title: "Invisible braces - Aligners",
    description:
      "A discreet orthodontic treatment using a series of clear, custom-made aligners to gradually shift teeth into the desired position.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/images%20(1).jpg",
    slug: "invisible-braces-Aligners",
  },
  {
    title: "Dental-tourism",
    description:
      "Combining your dental treatment with a travel experience, offering high-quality dental care while visiting a new location.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/Dental%20tourism.png',
    slug: "dental-tourism",
  },
];

const DentalServices: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const autoScrollInterval = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const stopAutoScroll = () => {
    if (autoScrollInterval.current) {
      clearInterval(autoScrollInterval.current);
      autoScrollInterval.current = null;
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (
        scrollContainer.scrollLeft >=
        scrollContainer.scrollWidth - scrollContainer.clientWidth
      ) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    autoScrollInterval.current = setInterval(scroll, 30);

    return () => {
      if (autoScrollInterval.current) clearInterval(autoScrollInterval.current);
    };
  }, []);

  const scrollByCard = (direction: "left" | "right") => {
    const cardWidth = cardRef.current?.offsetWidth || 600;
    if (scrollRef.current) {
      stopAutoScroll();
      scrollRef.current.scrollLeft += direction === "left" ? -cardWidth : cardWidth;
    }
  };

  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-poppins text-dental-dark-blue">
          Our Dental Services
        </h2>

        <button
          onClick={() => scrollByCard("left")}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6 text-dental-dark-blue" />
        </button>

        <button
          onClick={() => scrollByCard("right")}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6 text-dental-dark-blue" />
        </button>

        {/* Scrollable Services */}
        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 py-4 cursor-grab scroll-smooth"
        >
          {[...services, ...services].map((service, index) => (
            <motion.div
              key={index}
              ref={index === 0 ? cardRef : null}
              className="flex-shrink-0 w-[600px] h-[300px] bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => navigate(`/treatment/${service.slug}`)}
            >
              <div className="flex h-full"                 style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)), url(${service.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} >
                <div className="w-3/4 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 font-poppins text-white">
                      {service.title}
                    </h3>
                    <p className="text-white font-raleway mb-3">
                      {service.description}
                    </p>
                  </div>
                  <span className="text-white font-semibold">Learn more →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
                <div className="text-center mt-10">
          <Link
            to="/treatments"
            className="text-dental-blue hover:text-blue-700 font-medium inline-flex items-center"
          >
            View all 
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
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

export default DentalServices;
