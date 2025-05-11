
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-dental-blue text-xl md:text-2xl font-bold">Dr. Prabha's Dental Clinic</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-dental-blue transition-colors">Home</Link>
            <Link to="/about" className="text-gray-700 hover:text-dental-blue transition-colors">About</Link>
            <Link to="/services" className="text-gray-700 hover:text-dental-blue transition-colors">Services</Link>
            <Link to="/doctor-tips" className="text-gray-700 hover:text-dental-blue transition-colors">Doctor Tips</Link>
            <Link to="/training" className="text-gray-700 hover:text-dental-blue transition-colors">Training</Link>
            <Link to="/contact" className="text-gray-700 hover:text-dental-blue transition-colors">Contact</Link>
          </div>

          {/* Book Appointment Button */}
          <Button 
            asChild 
            className="hidden md:inline-flex bg-dental-blue hover:bg-dental-dark-blue text-white"
          >
            <Link to="/book-appointment">Book Appointment</Link>
          </Button>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700" 
            onClick={toggleMenu} 
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link 
              to="/services" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              Services
            </Link>
            <Link 
              to="/doctor-tips" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              Doctor Tips
            </Link>
            <Link 
              to="/training" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              Training
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-dental-blue py-2 transition-colors"
              onClick={toggleMenu}
            >
              Contact
            </Link>
            <Button 
              asChild 
              className="bg-dental-blue hover:bg-dental-dark-blue text-white"
            >
              <Link to="/book-appointment" onClick={toggleMenu}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
