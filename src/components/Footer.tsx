
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1 - About */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Dr. Prabha's Dental Clinic</h3>
            <p className="mb-4">
              Providing comprehensive dental care with a gentle touch. Your smile is our priority.
            </p>
            <SocialLinks />
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-dental-blue transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-dental-blue transition-colors">About</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-dental-blue transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/doctor-tips" className="hover:text-dental-blue transition-colors">Doctor Tips</Link>
              </li>
              <li>
                <Link to="/training" className="hover:text-dental-blue transition-colors">Training</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-dental-blue transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-dental-blue transition-colors">Book Appointment</Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Contact */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-dental-blue mr-2 mt-1 flex-shrink-0" />
                <span>1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-dental-blue mr-2" />
                <a href="tel:+91095978766632" className="hover:text-dental-blue transition-colors">095978 76632</a>
              </div>
              
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-dental-blue mr-2" />
                <a href="mailto:info@drprabhasdental.com" className="hover:text-dental-blue transition-colors">info@drprabhasdental.com</a>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-dental-blue mr-2" />
                <span>Mon–Fri, 5–9 pm</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p>&copy; {currentYear} Dr. Prabha's Dental Clinic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
