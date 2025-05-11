
import { Button } from "@/components/ui/button";

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-dental-blue/10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-dental-blue/20 rounded-full"></div>
            <img 
              src="https://lh3.googleusercontent.com/p/AF1QipPdP5OxqA_12vAHbCrLsJJmi9Bfbi1ncjonhOXc=s1360-w1360-h1020-rw"
              alt="Dr. Prabha"
              className="rounded-lg shadow-lg w-full h-auto object-cover relative z-10"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-dental-dark-gray mb-1">
              About Drprabhasdentistry
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to Dr. Prabha's Dental Clinic, where we've been providing exceptional dental care to the Chennai community for over 15 years. Our modern facility is equipped with state-of-the-art technology to ensure you receive the best possible treatment.
            </p>
            <p className="text-gray-600 mb-6">
              Dr. Prabha completed her dental education at a prestigious institution and has pursued numerous advanced training certificates to stay at the forefront of dental innovations. With a gentle approach and attention to detail, she ensures each patient receives personalized care in a comfortable environment.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-dental-light-blue/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                <p className="text-sm text-gray-600">
                  To provide exceptional dental care that improves our patients' quality of life through education, prevention, and advanced treatment options.
                </p>
              </div>
              <div className="bg-dental-light-blue/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-sm text-gray-600">
                  To be the most trusted dental care provider in Chennai, known for our clinical excellence and compassionate patient experience.
                </p>
              </div>
            </div>

            <Button asChild className="bg-dental-blue hover:bg-blue-600">
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
