
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    id: 1,
    title: "General Dentistry",
    description: "Comprehensive check-ups, cleanings, fillings, and preventative care to maintain your oral health.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    )
  },
  {
    id: 2,
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, and other procedures to enhance the appearance of your smile.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
        <line x1="9" y1="9" x2="9.01" y2="9"></line>
        <line x1="15" y1="9" x2="15.01" y2="9"></line>
      </svg>
    )
  },
  {
    id: 3,
    title: "Orthodontics",
    description: "Braces, aligners, and other treatments to correct teeth alignment and bite issues.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <path d="M17 3a2.826 2.826 0 0 0-4 0L7 7a2.826 2.826 0 0 0 0 4L15 19c.64.64 1.509 1 2.414 1 .905 0 1.773-.36 2.414-1a3.41 3.41 0 0 0 0-4.828L14 9"></path>
      </svg>
    )
  },
  {
    id: 4,
    title: "Pediatric Dentistry",
    description: "Specialized dental care for children in a friendly, comfortable environment.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="22"></line>
      </svg>
    )
  },
  {
    id: 5,
    title: "Dental Implants",
    description: "Permanent replacements for missing teeth that look, feel, and function like natural teeth.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <path d="M8 2v2M12 2v2M16 2v2M3 7h18M5 7v12a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V7"></path>
      </svg>
    )
  },
  {
    id: 6,
    title: "Root Canal Treatment",
    description: "Treating infected tooth pulp to save teeth that would otherwise need extraction.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-dental-blue">
        <path d="M7 21h10"></path>
        <rect x="2" y="3" width="20" height="14" rx="2"></rect>
      </svg>
    )
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 bg-dental-light-blue/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dental-dark-gray mb-2">
            Our Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive dental care services to meet all your oral health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-xl mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
