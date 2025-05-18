
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Phone, MessageSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const treatments = [
  "General Check-up", 
  "Teeth Cleaning", 
  "Teeth Whitening", 
  "Root Canal",
  "Dental Implant",
  "Orthodontics",
  "Dental Crown",
  "Tooth Extraction"
];

const AppointmentBookingSection = () => {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [treatment, setTreatment] = useState(treatments[0]);
  const [showPhoneOption, setShowPhoneOption] = useState(true);

  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !time || !day) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Format the WhatsApp message
    const message = `Hello Dr. Prabha, I'd like to book an appointment.\n\nName: ${name}\nTime: ${time}\nDay: ${day}\nTreatment: ${treatment}`;
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/919597876632?text=${encodedMessage}`, "_blank");
  };

  const handlePhoneCall = () => {
    window.location.href = "tel:+919597876632";
  };

  return (
    <section className="py-10 bg-gradient-to-r from-dental-light-blue/30 to-dental-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">Book Your Appointment</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Schedule your dental appointment easily through our WhatsApp chatbot
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Quick Appointment Booking</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Time*
                  </label>
                  <input
                    id="time"
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                    placeholder="e.g. 5:30 PM"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="day" className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Day*
                  </label>
                  <input
                    id="day"
                    type="text"
                    value={day}
                    onChange={(e) => setDay(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                    placeholder="e.g. Monday"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">
                    Treatment
                  </label>
                  <select
                    id="treatment"
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dental-blue focus:border-transparent"
                  >
                    {treatments.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md mt-4">
                <div className="flex items-center space-x-2">
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  Book via WhatsApp
                </Button>
                
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full border-dental-blue text-dental-blue hover:bg-dental-blue/10 flex items-center justify-center gap-2"
                    onClick={handlePhoneCall}
                  >
                    <Phone className="h-4 w-4" />
                    Call Now
                  </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AppointmentBookingSection;
