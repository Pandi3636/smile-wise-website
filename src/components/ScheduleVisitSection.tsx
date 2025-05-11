
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Phone, ArrowRight } from "lucide-react";
import { useState } from "react";

const ScheduleVisitSection = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [concern, setConcern] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format the WhatsApp message
    const message = `Hello Dr. Prabha, I would like to schedule an appointment.\n\nName: ${name}\nPhone: ${phone}\nConcern: ${concern}`;
    const encodedMessage = encodeURIComponent(message);
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/919597876632?text=${encodedMessage}`, "_blank");
  };

  return (
    <section id="schedule" className="py-16 bg-dental-light-blue/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Schedule a Visit
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in your details to book an appointment with Dr. Prabha
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden border-dental-blue/20 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-dental-blue p-8 text-white">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="h-6 w-6" />
                  <h3 className="font-semibold text-xl">Quick Booking</h3>
                </div>
                
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <ArrowRight size={14} />
                    </div>
                    <p>Complete the form with your details</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <ArrowRight size={14} />
                    </div>
                    <p>We'll redirect you to WhatsApp with a pre-filled message</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-white/20 rounded-full p-1 mt-1">
                      <ArrowRight size={14} />
                    </div>
                    <p>Send the message and we'll confirm your appointment promptly</p>
                  </li>
                </ul>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm mb-2">Clinic Hours:</p>
                  <p className="font-medium">Monday – Friday: 5:00 PM – 9:00 PM</p>
                </div>
              </div>
              
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="concern" className="block text-sm font-medium text-gray-700 mb-1">
                      Dental Concern
                    </label>
                    <textarea
                      id="concern"
                      value={concern}
                      onChange={(e) => setConcern(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                      rows={3}
                      required
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-dental-blue hover:bg-blue-600"
                  >
                    <Phone className="mr-2" size={16} />
                    Book via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ScheduleVisitSection;
