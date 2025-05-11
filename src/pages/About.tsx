
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-dental-light-mint py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">About Dr. Prabha's Dental Clinic</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get to know our clinic and our mission to provide exceptional dental care.
              </p>
            </div>
          </div>
        </div>
        
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Dr. Prabha's Dental Clinic was established with a vision to provide comprehensive dental care with a gentle touch. 
                  With years of experience and a passion for dentistry, Dr. Prabha has created a warm, welcoming environment 
                  where patients of all ages can receive the highest quality dental care.
                </p>
                <p className="text-gray-600">
                  Our clinic is equipped with state-of-the-art technology, enabling us to offer a wide range of services 
                  from routine check-ups to complex procedures. We pride ourselves on staying updated with the latest 
                  advancements in dental care to ensure the best outcomes for our patients.
                </p>
              </div>
              
              <div className="bg-gray-100 p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                <p className="text-gray-600 mb-6">
                  To provide exceptional dental care in a comfortable and caring environment, 
                  helping our patients achieve and maintain optimal oral health and beautiful smiles.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Values</h3>
                <ul className="space-y-2 text-gray-600 list-disc pl-5">
                  <li>Patient-centered approach focused on comfort and care</li>
                  <li>Commitment to excellence and continuous learning</li>
                  <li>Transparency and honesty in all our interactions</li>
                  <li>Respect for our patients' time and needs</li>
                  <li>Emphasis on preventive care and education</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Dr. Prabha</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Experienced dentist with a passion for creating beautiful, healthy smiles.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  {/* Placeholder for doctor's image */}
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Doctor Photo
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Dr. Prabha</h3>
                  <p className="text-dental-blue font-medium mb-4">Dental Surgeon</p>
                  <p className="text-gray-600 mb-4">
                    Dr. Prabha brings over 15 years of experience in dentistry, with specialization in both general and 
                    cosmetic procedures. Her gentle approach and meticulous attention to detail have earned her the trust 
                    and loyalty of patients across Chennai.
                  </p>
                  <p className="text-gray-600">
                    She is committed to continuous education and regularly participates in dental conferences and workshops 
                    to bring the latest techniques and technologies to her practice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
