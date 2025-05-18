import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EmiContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Name: ${formData.name}%0AEmail: ${formData.email}%0AMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/+919876543210?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//WhatsApp%20Image%202025-05-17%20at%2021.37.31.jpeg')",
            filter: "brightness(0.7)"
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-bold text-white mt-7 font-poppins">
                  Easy Monthly Installments
                </h1>
                <p className="text-lg text-white/90 font-raleway mt-7">
                  Get the dental care you deserve with our flexible payment options
                </p>
              </div>

              <Card className="bg-white/55 backdrop-blur-sm shadow-xl mt-7">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-center text-dental-dark-blue font-poppins">
                    Contact Us for EMI Options
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-dental-dark-blue font-semibold">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                        className="border-dental-mint focus:border-dental-dark-blue"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-dental-dark-blue font-semibold">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Enter your email"
                        className="border-dental-mint focus:border-dental-dark-blue"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-dental-dark-blue font-semibold">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Tell us about your treatment needs and preferred payment duration"
                        className="min-h-[120px] border-dental-mint focus:border-dental-dark-blue"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-dental-mint hover:bg-dental-light-mint text-dental-dark-blue font-semibold py-3 text-lg transition-colors"
                    >
                      Send Message via WhatsApp
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Additional Information */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-dental-dark-blue mb-2">Quick Approval</h3>
                  <p className="text-gray-600">Get approved within 24 hours</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-dental-dark-blue mb-2">Flexible Terms</h3>
                  <p className="text-gray-600">Choose from 3 to 12 months</p>
                </div>
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg text-center">
                  <h3 className="text-xl font-semibold text-dental-dark-blue mb-2">Zero Interest</h3>
                  <p className="text-gray-600">Available on select treatments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmiContact; 