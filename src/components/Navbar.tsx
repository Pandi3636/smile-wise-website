
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Phone, Instagram, Youtube, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-dental-blue font-bold text-2xl">
              Drprabhasdentistry Clinic
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Home</Link>
            <Link to="/doctor-tips" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Doctor Tips</Link>
            <Link to="/services" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Services</Link>
            <Link to="/training" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Training</Link>
            <Link to="/about" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">About</Link>
            <Link to="/contact" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Contact</Link>
            <Button asChild className="bg-dental-blue hover:bg-blue-600">

              <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                Book Appointment
              </a>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-8">
              <Link to="/" className="text-dental-blue font-bold text-2xl" onClick={toggleMenu}>
                Drprabhasdentistry  Clinic
              </Link>
              <Button variant="ghost" onClick={toggleMenu} aria-label="Close Menu">
                <X />
              </Button>
            </div>
            <nav className="flex flex-col space-y-6">
              <Link to="/" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>Home</Link>
              <Link to="/about" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>About</Link>
              <Link to="/services" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>Services</Link>
              <Link to="/doctor-tips" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>Doctor Tips</Link>
              <Link to="/training" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>Training</Link>
              <Link to="/contact" className="text-xl text-dental-dark-gray hover:text-dental-blue font-medium transition-colors" onClick={toggleMenu}>Contact</Link>
              <Button asChild className="bg-dental-blue hover:bg-blue-600 w-full">
                <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                  Book Appointment
                </a>
              </Button>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-dental-blue" />
                    <span className="text-sm">1/70, Poonamallee High Rd, Sivabatham, Vanagaram, Chennai, Tamil Nadu 600095</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={18} className="text-dental-blue" />
                    <a href="tel:+919597876632" className="text-sm">095978 76632</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-dental-blue" />
                    <span className="text-sm">Mon–Fri, 5–9 pm</span>
                  </div>
                </div>

                <div className="flex gap-4 mt-4">
                  <a href="https://www.instagram.com/drprabhasdentistry?utm_source=qr&igsh=NGhrZmF3enM0NGhz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <Instagram className="text-dental-blue hover:text-blue-600 transition-colors" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <Youtube className="text-dental-blue hover:text-blue-600 transition-colors" />
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
