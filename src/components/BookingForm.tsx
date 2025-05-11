
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Phone, Clock } from "lucide-react";

const BookingForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    dentalConcern: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message
    const message = encodeURIComponent(
      `Hi Dr. Prabha, I would like to book an appointment.\n\nName: ${formData.fullName}\nPhone: ${formData.phoneNumber}\nConcern: ${formData.dentalConcern}`
    );
    
    // Generate WhatsApp link with pre-filled message
    const whatsappLink = `https://wa.me/91095978766632?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, "_blank");
    
    // Show success toast
    toast({
      title: "Booking initiated",
      description: "You're being redirected to WhatsApp to confirm your appointment.",
    });
    
    // Reset form
    setFormData({
      fullName: "",
      phoneNumber: "",
      dentalConcern: "",
    });
  };

  return (
    <section className="bg-dental-light-mint py-12 md:py-24" id="book-appointment">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Schedule a Visit</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill in your details to book an appointment with Dr. Prabha
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left side - Booking info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Booking</CardTitle>
                <CardDescription>How it works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/60 p-4 rounded-md">
                  <div className="font-bold text-xl mb-2">1</div>
                  <p>Complete the form with your details</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-md">
                  <div className="font-bold text-xl mb-2">2</div>
                  <p>We'll redirect you to WhatsApp with a pre-filled message</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-md">
                  <div className="font-bold text-xl mb-2">3</div>
                  <p>Send the message and we'll confirm your appointment promptly</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold mb-2">Clinic Hours:</h3>
                  <div className="flex items-start space-x-2">
                    <Clock className="h-5 w-5 text-dental-blue mt-0.5" />
                    <div>
                      <p>Monday – Friday: 5:00 PM – 9:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
                <CardDescription>
                  Please provide your details for booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="font-medium">
                      Full Name
                    </label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phoneNumber" className="font-medium">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="dentalConcern" className="font-medium">
                      Dental Concern
                    </label>
                    <Textarea
                      id="dentalConcern"
                      name="dentalConcern"
                      placeholder="Briefly describe your dental concern"
                      value={formData.dentalConcern}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-dental-blue hover:bg-dental-dark-blue"
                  >
                    <Phone className="mr-2 h-4 w-4" /> Book via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
