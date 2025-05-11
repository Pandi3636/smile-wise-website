
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const serviceItems = [
  {
    id: 1,
    title: "General Dentistry",
    description: "Comprehensive dental check-ups, cleanings, fillings, and preventive care.",
    icon: "🦷"
  },
  {
    id: 2,
    title: "Cosmetic Dentistry",
    description: "Teeth whitening, veneers, bonding, and other aesthetic improvements.",
    icon: "✨"
  },
  {
    id: 3,
    title: "Root Canal Treatment",
    description: "Professional and painless root canal procedures to save damaged teeth.",
    icon: "🔬"
  },
  {
    id: 4,
    title: "Pediatric Dentistry",
    description: "Child-friendly dental care focused on preventive education and treatments.",
    icon: "👶"
  },
  {
    id: 5,
    title: "Orthodontics",
    description: "Braces, aligners, and other treatments to straighten teeth and improve bites.",
    icon: "😁"
  },
  {
    id: 6,
    title: "Dental Implants",
    description: "Permanent replacement of missing teeth with natural-looking implants.",
    icon: "🔧"
  }
];

const Services = () => {
  return (
    <section className="bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a wide range of dental services to meet all your oral healthcare needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map(service => (
            <Card key={service.id} className="h-full transition-all duration-300 hover:shadow-lg hover:border-dental-blue">
              <CardHeader className="pb-2">
                <div className="text-4xl mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
