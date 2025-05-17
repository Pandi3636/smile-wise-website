
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Phone, MessageSquare } from 'lucide-react';

const WhatsAppBookingSection = () => {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [treatment, setTreatment] = useState('');
  const [showPhoneIcon, setShowPhoneIcon] = useState(true);
  
  const clinicPhoneNumber = '+919876543210'; // Replace with your actual clinic number
  
  const handleWhatsAppBooking = () => {
    // Format the message
    const message = `Hi, I'd like to book an appointment:\n- Name: ${name}\n- Time: ${time}\n- Day: ${day}\n- Treatment: ${treatment}`;
    
    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${clinicPhoneNumber.replace('+', '')}?text=${encodedMessage}`, '_blank');
  };
  
  const handlePhoneCall = () => {
    window.location.href = `tel:${clinicPhoneNumber}`;
  };
  
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const treatmentOptions = [
    'Teeth Whitening', 'Root Canal', 'Dental Implant', 'Braces',
    'Teeth Cleaning', 'Tooth Extraction', 'Dental Crown', 'Dentures'
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-dental-blue to-blue-600">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-r from-dental-blue to-blue-600">
              <h2 className="text-3xl font-bold text-white mb-4">Quick Appointment Booking</h2>
              <p className="text-white/90 mb-8">
                Book your dental appointment in seconds through WhatsApp. Fill in your details and we'll get back to you shortly.
              </p>
              <img 
                src="https://img.freepik.com/free-photo/dentist-examining-female-patient-with-tools_23-2148262454.jpg" 
                alt="Dentist appointment" 
                className="rounded-lg shadow-lg max-h-60 object-cover" 
              />
            </div>
            
            <div className="p-8 space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-700">Your Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full"
                />
              </div>
              
              <div>
                <Label htmlFor="time" className="text-gray-700">Preferred Time</Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="day" className="text-gray-700">Preferred Day</Label>
                <Select value={day} onValueChange={setDay}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>{day}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="treatment" className="text-gray-700">Treatment</Label>
                <Select value={treatment} onValueChange={setTreatment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentOptions.map((option) => (
                      <SelectItem key={option} value={option}>{option}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex-1">
                  <Button 
                    onClick={handleWhatsAppBooking} 
                    className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                  >
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Book via WhatsApp
                  </Button>
                </div>
                
                {showPhoneIcon && (
                  <Button
                    onClick={handlePhoneCall}
                    variant="outline"
                    className="aspect-square p-2 border-dental-blue text-dental-blue"
                  >
                    <Phone className="h-5 w-5" />
                  </Button>
                )}
              </div>
              
              <div className="flex items-center space-x-2 mt-2">
                <Switch
                  id="phone-toggle"
                  checked={showPhoneIcon}
                  onCheckedChange={setShowPhoneIcon}
                />
                <Label htmlFor="phone-toggle" className="text-sm text-gray-600">
                  Show phone call option
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsAppBookingSection;
