import React from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EmiContact = () => {
  const whatsappBaseUrl = "https://wa.me/+919876543210";

  const emiOptions = [
    {
      title: 'Quick Approval',
      description: 'Get approved within 24 hours',
      message: 'I am interested in Quick Approval EMI for dental treatment.',
    },
    {
      title: 'Flexible Terms',
      description: 'Choose from 3 to 12 months',
      message: 'I want to know more about Flexible EMI Terms.',
    },
    {
      title: 'Zero Interest',
      description: 'Available on select treatments',
      message: 'Please tell me more about Zero Interest EMI options.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          // style={{ 
          //   backgroundImage: "url('https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//WhatsApp%20Image%202025-05-17%20at%2021.37.31.jpeg')",
          //   filter: "brightness(1)"
          // }}
        />

        {/* Content */}
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Heading */}
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mt-7 font-poppins">
                  Easy Monthly Installments
                </h1>
                <p className="text-lg text-white/90 font-raleway mt-7">
                  Get the dental care you deserve with our flexible payment options
                </p>
              </div>

              {/* Card with CTA options */}
              <Card className="bg-white/55 backdrop-blur-sm shadow-xl mt-7">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-dental-dark-blue font-poppins">
                    Contact Us for EMI Options
                  </CardTitle>
                </CardHeader>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  {emiOptions.map((item, index) => {
                    const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(item.message)}`;
                    return (
                      <a
                        key={index}
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center hover:shadow-xl transition-all duration-300"
                      >
                        <h3 className="text-xl font-semibold text-dental-dark-blue mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </a>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmiContact;
