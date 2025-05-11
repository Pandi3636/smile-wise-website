
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Clock, MapPin, Instagram, Youtube, MessageSquare } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have questions or ready to schedule your appointment? Reach out to us today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="text-dental-blue mt-1" size={24} />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Address</h3>
                    <p className="text-gray-600">
                      1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095
                    </p>
                    <a 
                      href="https://maps.google.com/?q=1/70,+Poonamallee+High+Rd,+Sivabatham,+Vanagaram,+Chennai,+Tamil+Nadu+600095" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-dental-blue hover:underline text-sm inline-block mt-2"
                    >
                      Get Directions
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-dental-blue mt-1" size={24} />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone</h3>
                    <a 
                      href="tel:+919597876632" 
                      className="text-gray-600 hover:text-dental-blue transition-colors"
                    >
                      095978 76632
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-dental-blue mt-1" size={24} />
                  <div>
                    <h3 className="font-medium text-lg mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Monday – Friday: 5:00 PM – 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <h3 className="font-medium text-lg mb-3">Follow Us</h3>
                  <div className="flex gap-4">
                    <a 
                      href="https://www.instagram.com/drprabhasdentistry?utm_source=qr&igsh=NGhrZmF3enM0NGhz" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dental-light-blue/30 hover:bg-dental-light-blue transition-colors p-3 rounded-full"
                    >
                      <Instagram className="text-dental-blue" size={20} />
                    </a>
                    <a 
                      href="https://youtube.com" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-dental-light-blue/30 hover:bg-dental-light-blue transition-colors p-3 rounded-full"
                    >
                      <Youtube className="text-dental-blue" size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-dental-blue text-white">
            <CardContent className="p-6">
              <div className="space-y-6">
                <h3 className="font-bold text-2xl">Book an Appointment</h3>
                <p>
                  Ready to schedule your dental appointment? Contact us via WhatsApp for the quickest response.
                </p>

                <div className="bg-white/10 rounded-lg p-4">
                  <h4 className="font-medium mb-1">WhatsApp Booking</h4>
                  <p className="text-sm mb-4">
                    Send us a message with your preferred date and time, and we'll confirm your appointment promptly.
                  </p>

                  <Button asChild className="w-full bg-white text-dental-blue hover:bg-gray-100">
                    <a 
                      href="https://wa.me/919597876632" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center"
                    >
                      <MessageSquare className="mr-2" size={18} />
                      Book via WhatsApp
                    </a>
                  </Button>
                </div>

                <div>
                  <h4 className="font-medium mb-2">What to include in your message:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Your full name</li>
                    <li>Preferred date and time</li>
                    <li>Reason for visit</li>
                    <li>Any dental concerns</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
