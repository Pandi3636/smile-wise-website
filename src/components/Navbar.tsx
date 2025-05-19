import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Phone, Instagram, Youtube, Clock, MapPin, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

// Treatment menu items
const treatmentItems = [
  { title: "Non contact Cleaning", slug: "non-contact-cleaning" },
  { title: "Cosmetic Dentistry", slug: "cosmetic-dentistry" },
  { title: "General Dentistry", slug: "general-dentistry" },
  { title: "Digital Dentistry", slug: "digital-dentistry" },
  { title: "Root Canal", slug: "root-canal" },
  { title: "Implants", slug: "implants" },
  { title: "Orthodontics", slug: "orthodontics" },
  { title: "Stress Free Treatments", slug: "stress-free-treatments" },
  { title: "Children's Dentistry", slug: "childrens-dentistry" },
  { title: "Reverse Aging Dentistry", slug: "reverse-aging-dentistry" },
  { title: "Crown in A Day", slug: "crown-in-a-day" },
  { title: "Smile Corrections", slug: "smile-corrections" },
  { title: "Zygoma Implants", slug: "zygoma-implants" },
  { title: "Fixed Teeth Rehabilitation Within 3 days", slug: "fixed-teeth-rehabilitation-within-3-days" },
  { title: "Invisible braces - Aligners", slug: "invisible-braces-aligners" },
  { title: "Laser Dentistry", slug: "laser-dentistry" },
  { title: "Dental Tourism", slug: "dental-tourism" },
];

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

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center text-dental-black font-bold text-2xl">
              <img
                src="https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//2a0326a6-8854-40d1-88dd-14ed79c172ed-removebg-preview.png"
                alt="Dr. Prabha"
                className="w-20 h-16 object-cover"
              />
              <span
                className="ml-4 text-xl lg:text-2xl text-dental-blue"
                style={{ fontFamily: "'Playpen Sans', cursive" }} >
                Dr Prabhas Dentistry
              </span>
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
            <NavigationMenu className="w-full">
              <NavigationMenuList className="w-full">
                <NavigationMenuItem className="w-full">
                  <NavigationMenuTrigger className="text-dental-dark-gray hover:text-dental-black font-medium transition-colors">
                    Treatments
                  </NavigationMenuTrigger>
                  <NavigationMenuContent
                    className="rounded-md shadow-lg absolute bg-white"
                  >
                    <ul className="flex flex-col w-[210px]">
                      {treatmentItems.map((item) => (
                        <li key={item.slug}>
                          <Link
                            to={`/treatments/${item.slug}`}
                            className="block px-3 py-2 text-dental-dark-gray hover:text-dental-blue hover:bg-gray-100 transition-colors"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link to="/doctor-tips" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Doctor Tips</Link>
            {/* <Link to="/services" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Services</Link> */}
            <Link to="/training" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Training</Link>
            <Link to="/gallery" className="text-dental-dark-gray hover:text-dental-blue font-medium transition-colors">Gallery</Link>
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
        <div 
          className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <Link to="/" className="flex items-center gap-2" onClick={toggleMenu}>
                <img
                  src="https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//2a0326a6-8854-40d1-88dd-14ed79c172ed.jpg"
                  alt="Dr. Prabha"
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <span className="text-dental-blue font-semibold">Dr Prabhas Dentistry</span>
              </Link>
              <Button variant="ghost" onClick={toggleMenu} aria-label="Close Menu">
                <X />
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-4 space-y-1">
                <Link 
                  to="/" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Home
                </Link>

                {/* Treatments Section */}
                <div className="py-2">
                  <div className="px-4 text-lg font-medium text-dental-dark-gray mb-2">Treatments</div>
                  <div className="max-h-[300px] overflow-y-auto bg-gray-50 rounded-lg">
                    {treatmentItems.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/treatments/${item.slug}`}
                        className="block py-2 px-6 text-dental-dark-gray hover:text-dental-blue hover:bg-gray-100 transition-colors"
                        onClick={toggleMenu}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Other Links */}
                <Link 
                  to="/doctor-tips" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Doctor Tips
                </Link>
                <Link 
                  to="/services" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Services
                </Link>
                <Link 
                  to="/training" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Training
                </Link>
                <Link 
                  to="/gallery" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Gallery
                </Link>
                <Link 
                  to="/about" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link 
                  to="/contact" 
                  className="block py-2 px-4 text-lg text-dental-dark-gray hover:text-dental-blue hover:bg-gray-50 rounded-lg transition-colors" 
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </nav>

              {/* Contact Information */}
              <div className="p-4 border-t">
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
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <Button asChild className="bg-dental-blue hover:bg-blue-600 w-full">
                <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                  Book Appointment
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
