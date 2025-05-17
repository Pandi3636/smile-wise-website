
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';

type ServiceDetail = {
  id: string;
  title: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  image: string;
  price: string;
};

const serviceDetails: Record<string, ServiceDetail> = {
  'general-dentistry': {
    id: 'general-dentistry',
    title: 'General Dentistry',
    fullDescription: 'Our general dentistry services focus on diagnosing, preventing, and treating common dental issues. Regular check-ups, cleanings, and preventive care are essential components of maintaining good oral health.',
    benefits: [
      'Prevent tooth decay and gum disease',
      'Early detection of dental problems',
      'Professional cleaning removes plaque and tartar',
      'Guidance on proper home care techniques',
    ],
    process: [
      'Comprehensive examination of teeth, gums, and oral tissues',
      'Professional cleaning to remove plaque and tartar',
      'X-rays to detect hidden issues',
      'Treatment of cavities, gum disease, and other common dental problems',
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹500',
  },
  'cosmetic-dentistry': {
    id: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry',
    fullDescription: 'Transform your smile with our cosmetic dentistry services. We offer various treatments designed to improve the appearance of your teeth and give you the confidence to smile brightly.',
    benefits: [
      'Enhanced appearance and confidence',
      'Improved dental function',
      'Long-lasting results',
      'Personalized treatment plans',
    ],
    process: [
      'Initial consultation to understand your goals',
      'Custom treatment planning based on your needs',
      'Procedure implementation with careful attention to aesthetics',
      'Follow-up care to ensure lasting results',
    ],
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹3,000',
  },
  'orthodontics': {
    id: 'orthodontics',
    title: 'Orthodontics',
    fullDescription: 'Our orthodontic services help align your teeth and jaw for both aesthetic appeal and improved function. We offer traditional braces and clear aligners to suit different preferences and needs.',
    benefits: [
      'Straighter, more aligned teeth',
      'Improved bite function',
      'Easier cleaning and maintenance',
      'Reduced risk of dental problems',
    ],
    process: [
      'Comprehensive orthodontic assessment',
      'Development of a personalized treatment plan',
      'Regular adjustments and monitoring',
      'Retention planning to maintain results',
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹30,000',
  },
  'root-canal': {
    id: 'root-canal',
    title: 'Root Canal Treatment',
    fullDescription: 'Root canal treatment is performed to save a severely infected or damaged tooth. The procedure involves removing the infected pulp, cleaning the canals, and sealing them to prevent future infections.',
    benefits: [
      'Save your natural tooth',
      'Relieve pain from infected pulp',
      'Prevent spread of infection',
      'Restore normal tooth function',
    ],
    process: [
      'Diagnosis and assessment of the infected tooth',
      'Removal of infected pulp tissue',
      'Cleaning and shaping of the root canals',
      'Filling and sealing of canals, followed by a crown placement',
    ],
    image: 'https://images.unsplash.com/photo-1507461476191-0ed4f9f18533?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹5,000',
  },
  'implants': {
    id: 'implants',
    title: 'Dental Implants',
    fullDescription: 'Dental implants provide a permanent solution for replacing missing teeth. These titanium posts act as artificial tooth roots, supporting crowns, bridges, or dentures for a natural look and feel.',
    benefits: [
      'Permanent solution for missing teeth',
      'Natural look and function',
      'Prevent bone loss in the jaw',
      'No need to modify adjacent teeth',
    ],
    process: [
      'Comprehensive assessment and treatment planning',
      'Surgical placement of the implant',
      'Healing period for osseointegration',
      'Placement of the final restoration',
    ],
    image: 'https://plus.unsplash.com/premium_photo-1661766752153-9e4a5fb30774?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹20,000',
  },
  'childrens-dentistry': {
    id: 'childrens-dentistry',
    title: "Children's Dentistry",
    fullDescription: 'Our pediatric dental services are designed to make dental visits fun and comfortable for children while ensuring their oral health needs are met from an early age.',
    benefits: [
      'Early detection of dental problems',
      'Child-friendly environment and approach',
      'Education on proper oral hygiene',
      'Prevention of dental anxiety',
    ],
    process: [
      'Gentle examination and cleaning',
      'Preventive treatments like sealants and fluoride',
      'Education on brushing and flossing',
      'Monitoring growth and development of teeth and jaws',
    ],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹500',
  },
  'laser-dentistry': {
    id: 'laser-dentistry',
    title: 'Laser Dentistry',
    fullDescription: 'Our advanced laser dentistry services offer less invasive treatment options for various dental procedures, resulting in less discomfort, faster healing, and more precise treatment.',
    benefits: [
      'Minimally invasive procedures',
      'Less pain and discomfort',
      'Reduced bleeding and swelling',
      'Faster healing times',
    ],
    process: [
      'Evaluation of dental condition',
      'Treatment planning with laser technology',
      'Precise implementation of laser therapy',
      'Post-procedure care instructions',
    ],
    image: 'https://images.unsplash.com/photo-1579683558559-275e080e184c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹3,000',
  },
  'smile-corrections': {
    id: 'smile-corrections',
    title: 'Smile Corrections',
    fullDescription: 'Our smile correction services encompass a range of treatments designed to enhance the appearance of your smile, addressing issues like discoloration, misalignment, chips, and gaps.',
    benefits: [
      'Customized smile makeover plans',
      'Dramatic aesthetic improvements',
      'Boost in confidence and self-esteem',
      'Range of options to suit different needs',
    ],
    process: [
      'Initial consultation with smile analysis',
      'Digital smile design and treatment planning',
      'Implementation of chosen procedures',
      'Follow-up care and maintenance guidance',
    ],
    image: 'https://images.unsplash.com/photo-1581584407833-cfcf18c011a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹10,000',
  },
};

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    if (serviceId && serviceDetails[serviceId]) {
      setService(serviceDetails[serviceId]);
    }
  }, [serviceId]);

  if (!service) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-unifraktur">Service not found</h1>
          <Button asChild className="mt-4">
            <Link to="/services">Return to Services</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <Link 
          to="/services" 
          className="inline-flex items-center text-dental-blue hover:text-dental-dark-blue mb-6"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Services
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-64 md:h-80 relative">
            <img 
              src={service.image} 
              alt={service.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white font-unifraktur">{service.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 font-unifraktur text-center">About this Service</h2>
              <p className="text-gray-700">{service.fullDescription}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-dental-light-blue/10 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 font-unifraktur text-center">Benefits</h3>
                <ul className="space-y-2">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-dental-blue mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-dental-light-mint/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 font-unifraktur text-center">Treatment Process</h3>
                <ol className="space-y-2">
                  {service.process.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-dental-blue mr-2 font-bold">{index+1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-gray-600">Price Range:</p>
                <p className="text-2xl font-bold text-dental-blue">{service.price}</p>
              </div>
              <Button asChild className="bg-dental-blue hover:bg-blue-600">
                <a href="https://wa.me/919597876632?text=I'm%20interested%20in%20your%20services" target="_blank" rel="noreferrer">
                  Book Consultation
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
