
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const EmergencyCareSection = () => {
  return (
    <section className="py-16 bg-dental-blue/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-dental-blue p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Dental Emergency?</h2>
              <p className="mb-6">
                Dental emergencies can happen at any time. Severe toothaches, broken teeth, or knocked-out teeth require immediate attention.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 bg-white rounded-full text-dental-blue flex items-center justify-center font-bold mt-1">✓</span>
                  <span>Same-day emergency appointments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 bg-white rounded-full text-dental-blue flex items-center justify-center font-bold mt-1">✓</span>
                  <span>Emergency dental surgery when needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="inline-block w-5 h-5 bg-white rounded-full text-dental-blue flex items-center justify-center font-bold mt-1">✓</span>
                  <span>Pain management solutions</span>
                </li>
              </ul>
              <Button asChild size="lg" className="bg-white text-dental-blue hover:bg-gray-100">
                <a href="tel:+919597876632">
                  <Phone size={18} className="mr-2" />
                  Call Now: 095978 76632
                </a>
              </Button>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-xl font-semibold mb-4">What to do in a dental emergency:</h3>
              <ol className="space-y-4 list-decimal ml-5">
                <li>Call our emergency number immediately</li>
                <li>Describe your symptoms in detail</li>
                <li>For knocked-out teeth, keep the tooth moist</li>
                <li>For broken teeth, rinse your mouth with warm water</li>
                <li>Apply a cold compress for swelling</li>
              </ol>
              <div className="mt-6 bg-dental-light-gray p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Note:</strong> If you're experiencing severe bleeding, extreme pain, or have suffered trauma to your face or jaw, please visit your nearest emergency room first.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCareSection;
