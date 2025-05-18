import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

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
    image: 'https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//3dccc5f0-11c7-4efa-8ba9-a1ad9da6f9b3.jpg',
    price: 'Starting from ₹3,000',
  },
  'reverse-aging-dentistry': {
    id: 'reverse-aging-dentistry',
    title: 'Reverse Aging Dentistry',
    fullDescription: 'Comprehensive treatments focused on restoring youthful dental aesthetics and function, addressing issues like wear, discoloration, and volume loss.',
    benefits: [
      'Rejuvenated smile appearance',
      'Improved facial aesthetics',
      'Restored dental function',
      'Increased confidence',
    ],
    process: [
      'Consultation and smile analysis',
      'Customized treatment plan (veneers, crowns, bonding, etc.)',
      'Execution of selected rejuvenation procedures',
      'Ongoing care and maintenance recommendations',
    ],
    image: 'https://images.pexels.com/photos/5622023/pexels-photo-5622023.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Starting from ₹15,000',
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
    image: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://images.pexels.com/photos/4971514/pexels-photo-4971514.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//e04266cb-4ab8-4447-ab95-18f657a996f8.jpg',
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
    image: 'https://images.pexels.com/photos/7789705/pexels-photo-7789705.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600',
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
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//a1e4ee3c-0291-414e-8f33-ed94bba464df.jpg',
    price: 'Starting from ₹10,000',
  },
  'non-contact-cleaning': {
    id: 'non-contact-cleaning',
    title: 'Non contact Cleaning',
    fullDescription: 'Utilizing advanced technology for a comfortable and efficient dental cleaning experience with minimal contact.',
    benefits: [
      'Increased patient comfort',
      'Reduced aerosols',
      'Efficient plaque and tartar removal',
      'Ideal for sensitive patients',
    ],
    process: [
      'Initial assessment',
      'Application of non-contact cleaning technology',
      'Gentle polishing',
      'Final check and recommendations',
    ],
    image: 'https://images.unsplash.com/photo-1621072156912-f55c4e6c7f1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Starting from ₹800',
  },
  'digital-dentistry': {
    id: 'digital-dentistry',
    title: 'Digital Dentistry',
    fullDescription: 'Leveraging digital tools and workflows for enhanced precision, efficiency, and patient experience in various dental procedures.',
    benefits: [
      'Improved accuracy and predictability',
      'Faster treatment times',
      'Enhanced patient communication',
      'Minimally invasive options',
    ],
    process: [
      'Digital scanning and imaging',
      'Computer-aided design and manufacturing',
      'Precise treatment delivery',
      'Digital record keeping',
    ],
    image: 'https://images.pexels.com/photos/6502161/pexels-photo-6502161.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Price varies by service',
  },

  'crown-in-a-day': {
    id: 'crown-in-a-day',
    title: 'Crown In A Day',
    fullDescription: 'Using CEREC technology to design, create, and place dental crowns in a single appointment, offering a fast and convenient restoration.',
    benefits: [
      'Single-visit convenience',
      'Precise and natural-looking crowns',
      'Eliminates temporary crowns',
      'Durable and long-lasting results',
    ],
    process: [
      'Tooth preparation and digital scan',
      'Crown design using CAD/CAM software',
      'In-office milling of the crown',
      'Bonding the crown to the tooth',
    ],
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Starting from ₹15,000',
  },
  'zygoma-implants': {
    id: 'zygoma-implants',
    title: 'Zygoma Implants',
    fullDescription: 'A specialized implant technique using the zygomatic bone to provide support for dental prosthetics, often used in cases of significant bone loss in the upper jaw.',
    benefits: [
      'Avoids the need for bone grafting',
      'Provides stable support for prosthetics',
      'Suitable for severe bone loss',
      'Faster rehabilitation',
    ],
    process: [
      'Detailed assessment and imaging',
      'Surgical placement of zygoma implants',
      'Prosthetic attachment (often immediate)',
      'Healing and follow-up care',
    ],
    image: 'https://images.unsplash.com/photo-1546519638-68e1b0df096b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Price varies upon consultation',
  },
  'fixed-teeth-rehabilitation-within-3-days': {
    id: 'fixed-teeth-rehabilitation-within-3-days',
    title: 'Fixed Teeth Rehabilitation Within 3 days',
    fullDescription: 'A rapid and efficient method to restore full arch dentition with fixed prosthetics, providing functional teeth shortly after implant placement.',
    benefits: [
      'Immediate fixed teeth',
      'Minimizes time without teeth',
      'Restores chewing function quickly',
      'Improved quality of life',
    ],
    process: [
      'Assessment and planning',
      'Implant placement',
      'Temporary prosthetic attachment within 3 days',
      'Final prosthetic placement after healing',
    ],
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Price varies upon consultation',
  },
  'invisible-braces-aligners': {
    id: 'invisible-braces-aligners',
    title: 'Invisible braces - Aligners',
    fullDescription: 'A discreet orthodontic treatment using a series of clear, custom-made aligners to gradually shift teeth into the desired position.',
    benefits: [
      'Nearly invisible appearance',
      'Removable for eating and cleaning',
      'Comfortable to wear',
      'Effective for various alignment issues',
    ],
    process: [
      'Consultation and 3D scanning',
      'Custom aligner fabrication',
      'Wearing aligners in sequence',
      'Regular check-ups and monitoring',
    ],
    image: 'https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 'Starting from ₹50,000',
  },
  'dental-tourism': {
    id: 'dental-tourism',
    title: 'Dental Tourism',
    fullDescription: 'Combining your dental treatment with a travel experience, offering high-quality dental care while visiting a new location.',
    benefits: [
      'Cost savings on dental procedures',
      'Opportunity to travel',
      'High standard of care',
      'Efficient treatment scheduling',
    ],
    process: [
      'Initial consultation and planning',
      'Travel arrangements',
      'Dental treatment',
      'Recovery and follow-up',
    ],
    image: 'https://images.unsplash.com/photo-1583422409516-2895a779c6c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 'Price varies by treatment and location',
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
    <div
      className="min-h-screen bg-cover bg-center bg-fixed">
      <Navbar />

      <div className="relative z-10 bg-white/80 backdrop-blur-sm pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 md:h-80 relative hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6">
                  <h1 className="text-3xl md:text-4xl font-bold text-white ">{service.title}</h1>
                </div>
              </div>
            </div>

            <div className="w-full h-full bg-cover bg-center">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left: Text Content */}
                <div className="mb-8 text-center md:text-left px-4">
                  <h1 className="text-3xl md:text-3xl font-bold text-black mb-4">{service.title}</h1>
                  <h2 className="text-1xl font-semibold mb-4 text-black">About this Service</h2>
                  <p className="text-black mb-6">{service.fullDescription}</p>

                  <div className="bg-dental-light-blue/10 p-6 rounded-lg mb-6">
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
                          <span className="text-dental-blue mr-2 font-bold">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="text-center mt-8">
                    <Button asChild className="bg-dental-blue hover:bg-blue-600">
                      <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                        Book Appointment via WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>

                {/* Right: Image */}
                <div className="flex justify-center items-center p-4">
                  <img
                    src={service.image}
                    alt="Service Image"
                    className="rounded-lg shadow-lg w-full h-auto max-h-[500px] object-cover"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;
