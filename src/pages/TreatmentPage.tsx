import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface FAQ {
  question: string;
  answer: string;
}

export interface Treatment {
  title: string;
  description: string;
  image: string;
  benefits: string[];
  process: string[];
  faq: FAQ[];
}

// Treatment data - in a real application, this would come from a database
export const treatments: Record<string, Treatment> = {
  "general-dentistry": {
    title: "General Dentistry",
    description: "Our general dentistry services cover routine check-ups, cleanings, fillings, and preventive care to maintain your oral health.",
    image:
      "https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Prevent tooth decay and gum disease",
      "Early detection of dental problems",
      "Maintain overall oral health",
      "Professional teeth cleaning"
    ],
    process: [
      "Initial consultation and examination",
      "Digital X-rays and diagnostics",
      "Professional cleaning and scaling",
      "Treatment planning and implementation",
      "Follow-up care and maintenance"
    ],
    faq: [
      {
        question: "How often should I visit the dentist?",
        answer: "We recommend visiting the dentist every 6 months for routine check-ups and cleanings. However, some patients may need more frequent visits based on their oral health needs."
      },
      {
        question: "What happens during a routine dental check-up?",
        answer: "A routine check-up includes a thorough examination of your teeth, gums, and mouth, professional cleaning, X-rays if needed, and a discussion about your oral health and any concerns."
      },
      {
        question: "Is dental cleaning painful?",
        answer: "Dental cleaning is generally not painful. Some patients may experience slight discomfort, but we use gentle techniques and can provide numbing options if needed."
      }
    ]
  },
  "cosmetic-dentistry": {
    title: "Cosmetic Dentistry",
    description: "Transform your smile with our cosmetic dentistry services including teeth whitening, veneers, and smile makeovers.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//3dccc5f0-11c7-4efa-8ba9-a1ad9da6f9b3.jpg",
    benefits: [
      "Enhance your smile's appearance",
      "Boost your confidence",
      "Correct discoloration and staining",
      "Fix chips, cracks and gaps"
    ],
    process: [
      "Initial smile consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Follow-up and maintenance"
    ],
    faq: [
      {
        question: "How long do cosmetic procedures last?",
        answer: "The longevity of cosmetic procedures varies. Teeth whitening typically lasts 6-12 months, while veneers and crowns can last 10-15 years with proper care."
      },
      {
        question: "Are cosmetic procedures painful?",
        answer: "Most cosmetic procedures are minimally invasive and cause little to no discomfort. We use local anesthesia when needed to ensure your comfort."
      },
      {
        question: "How much do cosmetic procedures cost?",
        answer: "Costs vary depending on the specific procedure and your individual needs. We offer flexible payment plans and can provide a detailed estimate during your consultation."
      }
    ]
  },
  "orthodontics": {
    title: "Orthodontics",
    description: "Straighten your teeth and correct bite issues with our modern orthodontic treatments including braces and clear aligners.",
    image: 'https://images.pexels.com/photos/6627562/pexels-photo-6627562.jpeg?auto=compress&cs=tinysrgb&w=600',
    benefits: [
      "Straighten misaligned teeth",
      "Correct bite problems",
      "Improve oral function",
      "Enhance facial aesthetics"
    ],
    process: [
      "Initial orthodontic consultation",
      "Digital scanning and X-rays",
      "Treatment plan development",
      "Appliance placement",
      "Regular adjustments and monitoring"
    ],
    faq: [
      {
        question: "How long does orthodontic treatment take?",
        answer: "Treatment duration varies based on individual needs, typically ranging from 12-24 months. We'll provide a specific timeline during your consultation."
      },
      {
        question: "Are there options besides traditional braces?",
        answer: "Yes, we offer various options including clear aligners, ceramic braces, and lingual braces. We'll recommend the best option for your needs."
      },
      {
        question: "Will orthodontic treatment be painful?",
        answer: "You may experience some discomfort when braces are first placed or adjusted, but this is temporary and can be managed with over-the-counter pain relievers."
      }
    ]
  },
  "root-canal": {
    title: "Root Canal Treatment",
    description: "Save your natural tooth and relieve pain with our gentle and effective root canal treatments.",
    image:
      "https://images.pexels.com/photos/4971514/pexels-photo-4971514.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Eliminate tooth pain",
      "Save your natural tooth",
      "Prevent infection spread",
      "Restore tooth functionality"
    ],
    process: [
      "Diagnosis and X-rays",
      "Local anesthesia",
      "Pulp removal and cleaning",
      "Canal filling and sealing",
      "Crown placement"
    ],
    faq: [
      {
        question: "Is root canal treatment painful?",
        answer: "Modern root canal treatment is relatively painless. We use local anesthesia to ensure your comfort throughout the procedure."
      },
      {
        question: "How long does a root canal take?",
        answer: "A typical root canal procedure takes 1-2 hours, depending on the complexity of the case and the number of canals in the tooth."
      },
      {
        question: "What happens after a root canal?",
        answer: "After the procedure, you may experience some sensitivity for a few days. We'll provide specific care instructions and schedule a follow-up appointment."
      }
    ]
  },
  "implants": {
    title: "Dental Implants",
    description: "Replace missing teeth with dental implants that look, feel, and function like your natural teeth.",
    image:
      "https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//e04266cb-4ab8-4447-ab95-18f657a996f8.jpg",
    benefits: [
      "Permanent solution for missing teeth",
      "Preserve facial structure",
      "Look and function like natural teeth",
      "No adhesives or removable parts"
    ],
    process: [
      "Initial consultation and planning",
      "Implant placement surgery",
      "Healing period",
      "Abutment placement",
      "Crown attachment"
    ],
    faq: [
      {
        question: "How long do dental implants last?",
        answer: "With proper care, dental implants can last a lifetime. The crown may need replacement after 10-15 years."
      },
      {
        question: "Is implant surgery painful?",
        answer: "The procedure is performed under local anesthesia, so you won't feel pain during the surgery. Some discomfort may occur during healing."
      },
      {
        question: "Who is a good candidate for implants?",
        answer: "Most healthy adults with good oral health are candidates. We'll evaluate your specific situation during the consultation."
      }
    ]
  },
  "childrens-dentistry": {
    title: "Children's Dentistry",
    description: "Specialized dental care for children in a friendly, comfortable environment to establish good oral health habits early.",
    image:
      "https://images.pexels.com/photos/7789705/pexels-photo-7789705.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Early detection of dental issues",
      "Child-friendly dental environment",
      "Education on proper oral hygiene",
      "Preventive treatments"
    ],
    process: [
      "Child-friendly introduction",
      "Gentle examination",
      "Preventive treatments",
      "Education and guidance",
      "Regular follow-ups"
    ],
    faq: [
      {
        question: "When should my child first visit the dentist?",
        answer: "We recommend bringing your child for their first dental visit when their first tooth appears or by their first birthday."
      },
      {
        question: "How can I prepare my child for their first visit?",
        answer: "Talk positively about the dentist, read children's books about dental visits, and explain that the dentist helps keep their teeth healthy."
      },
      {
        question: "What preventive treatments do you offer for children?",
        answer: "We offer fluoride treatments, dental sealants, and regular cleanings to help prevent cavities and maintain oral health."
      }
    ]
  },
  "laser-dentistry": {
    title: "Laser Dentistry",
    description: "Advanced laser technology for more comfortable and precise dental procedures with faster healing times.",
    image:
      "https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Less pain and discomfort",
      "Reduced bleeding and swelling",
      "Faster healing times",
      "More precise treatment"
    ],
    process: [
      "Initial assessment",
      "Treatment planning",
      "Laser procedure",
      "Post-treatment care",
      "Follow-up evaluation"
    ],
    faq: [
      {
        question: "Is laser dentistry safe?",
        answer: "Yes, laser dentistry is FDA-approved and safe. Our team is specially trained in laser procedures."
      },
      {
        question: "What procedures can be done with lasers?",
        answer: "Lasers can be used for gum disease treatment, cavity detection, teeth whitening, and various soft tissue procedures."
      },
      {
        question: "Is laser treatment more expensive?",
        answer: "While laser procedures may cost slightly more, they often reduce the need for multiple visits and provide better results."
      }
    ]
  },
  "smile-corrections": {
    title: "Smile Corrections",
    description: "Comprehensive smile makeover services to address multiple aesthetic concerns and give you the smile of your dreams.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//a1e4ee3c-0291-414e-8f33-ed94bba464df.jpg',
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
  "reverse-aging-dentistry": {
    title: "Reverse Aging Dentistry",
    description: "Comprehensive treatments focused on restoring youthful dental aesthetics and function, addressing issues like wear, discoloration, and volume loss.",
    image: 'https://images.pexels.com/photos/5622023/pexels-photo-5622023.jpeg?auto=compress&cs=tinysrgb&w=600',
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
    "crown-in-a-day": {
    title: "Crown in A Day",
    description: "Using CEREC technology to design, create, and place dental crowns in a single appointment, offering a fast and convenient restoration.",
    image: 'https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600',
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
      "digital-dentistry": {
    title: "digital-dentistry",
    description:"Leveraging digital tools and workflows for enhanced precision, efficiency, and patient experience in various dental procedures.",
    image:
      "https://images.pexels.com/photos/6502161/pexels-photo-6502161.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
 "zygoma-implants": {
    title: "Zygoma Implants",
    description:      "A specialized implant technique using the zygomatic bone to provide support for dental prosthetics, often used in cases of significant bone loss in the upper jaw.",
    image: 'https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training//7e2fb975-ed49-41e6-91fb-b654e3592e1b.jpg',
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
   "fixed-teeth-rehabilitation-within-3-days": {
    title: "Fixed Teeth Rehabilitation Within 3 days",
    description:      "A rapid and efficient method to restore full arch dentition with fixed prosthetics, providing functional teeth shortly after implant placement.",
    image:
      "https://images.pexels.com/photos/6627564/pexels-photo-6627564.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
"invisible-braces-Aligners": {
    title: "Invisible braces - Aligners",
    description:
      "A discreet orthodontic treatment using a series of clear, custom-made aligners to gradually shift teeth into the desired position.",
    image:
      "https://images.pexels.com/photos/6529111/pexels-photo-6529111.jpeg?auto=compress&cs=tinysrgb&w=600",
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
  "dental-tourism": {
    title: "Dental-tourism",
    description:
      "Combining your dental treatment with a travel experience, offering high-quality dental care while visiting a new location.",
    image: 'https://images.pexels.com/photos/5355839/pexels-photo-5355839.jpeg?auto=compress&cs=tinysrgb&w=600',
    benefits: [
      "Customized treatment plan",
      "Address multiple issues at once",
      "Dramatic smile enhancement",
      "Boost your self-confidence"
    ],
    process: [
      "Smile analysis and consultation",
      "Digital smile design",
      "Treatment planning",
      "Procedure implementation",
      "Final adjustments and follow-up"
    ],
    faq: [
      {
        question: "What issues can smile correction address?",
        answer: "We can address discoloration, misalignment, gaps, chips, and other aesthetic concerns to create your ideal smile."
      },
      {
        question: "How long does a smile makeover take?",
        answer: "The duration varies based on the treatments needed. Some procedures can be completed in one visit, while others may take several months."
      },
      {
        question: "Will the results look natural?",
        answer: "Yes, we use advanced techniques and materials to ensure your new smile looks natural and complements your facial features."
      }
    ]
  },
};

const TreatmentPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const treatment = slug ? treatments[slug as keyof typeof treatments] : null;

  if (!treatment) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <h1 className="text-3xl font-bold text-center">Treatment not found</h1>
          <p className="text-center mt-4">The treatment you are looking for does not exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
            <div 
        className="relative pt-32 pb-20 mt-50" 
        style={{
          backgroundImage: `url(${treatment.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <h1 className="text-4xl font-bold text-center text-white ">{treatment.title}</h1>
        <p className="text-lg text-center text-white ">{treatment.description}</p>
        </div>
      </div>
      
      {/* Treatment Content */}
      <div className="container mx-auto px-1 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-semibold text-dental-dark-gray mb-6">About {treatment.title}</h2>
            <p className="text-gray-700 mb-6">
              At Dr. Prabha's Dental Clinic, we provide exceptional {treatment.title.toLowerCase()} services 
              using the latest technology and techniques. Our experienced team is committed to delivering 
              the best results with your comfort and satisfaction as our top priority.
            </p>
            <p className="text-gray-700 mb-8">
              We understand that each patient is unique, which is why we create personalized treatment 
              plans tailored to your specific needs and goals. Our modern facility is equipped with 
              state-of-the-art technology to ensure the highest standard of care.
            </p>
            
            <Button asChild className="bg-dental-blue hover:bg-blue-600">
              <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
                Book a Consultation
              </a>
            </Button>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold text-dental-dark-gray mb-6">Benefits</h3>
            <ul className="space-y-4">
              {treatment.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <div className="bg-dental-mint rounded-full p-1 mr-3 mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-dental-blue" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-800">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-dental-dark-gray mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {treatment.faq.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-dental-light-blue/10 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-dental-dark-gray mb-4">Ready to Transform Your Smile?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Take the first step towards a healthier, more beautiful smile. Book your consultation today and let our expert team guide you through your dental journey.
          </p>
          <Button asChild size="lg" className="bg-dental-blue hover:bg-blue-600">
            <a href="https://wa.me/919597876632" target="_blank" rel="noopener noreferrer">
              Book Appointment via WhatsApp
            </a>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TreatmentPage;
