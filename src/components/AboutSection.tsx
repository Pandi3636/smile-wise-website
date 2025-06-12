import { Button } from "@/components/ui/button";

const AboutSection = () => {


    const handlePhoneCall = () => {
    window.location.href = "tel:+919597876632";
  };
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-dental-blue/10 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-dental-blue/20 rounded-full"></div>
            <img 
              src="https://upkmrcbkrsfwejwepiqa.supabase.co/storage/v1/object/public/training/watermarked_images/0.3729503657982117.jpg"
              alt="Dr. Prabha's"
              className="rounded-lg shadow-lg w-full h-auto object-cover relative z-10"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-dental-dark-gray mb-1">
              About Dr.Prabhalakshmi
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to Dr Prabha's Dentistry Clinic, where we've been providing exceptional dental care to the Chennai community for over 18 years. Our modern facility is equipped with state-of-the-art technology to ensure you receive the best possible treatment.
            </p>
            <p className="text-gray-600 mb-6">
              Dr. Prabha is a Prosthodontist, Implantologist, and Cosmetic Dentist with extensive experience in both general and specialized dental procedures. She is fluent in English and Tamil, and ensures every patient is treated with personalized care and compassion.
            </p>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-dental-dark-gray mb-2">Clinic Details</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li><strong>Consultation Fee:</strong> ₹200</li>
                <li><strong>Video Consultation:</strong> ₹200</li>
                <li><strong>Languages Spoken:</strong> English, Tamil</li>
                <li><strong>Experience:</strong> 18 Years in Healthcare</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-dental-dark-gray mb-2">Specializations</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Prosthodontics</li>
                <li>Implantology</li>
                <li>Cosmetic Dentistry</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-dental-dark-gray mb-2">Treatments & Procedures</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm max-h-60 overflow-y-auto pr-2">
                <li>BPS Dentures Fixing</li>
                <li>Dental Consultation</li>
                <li>Acrylic Prosthesis</li>
                <li>Aesthetic Dentistry</li>
                <li>Ceramic Tooth</li>
                <li>All On 4 Dental Implants</li>
                <li>CAD CAM Zirconia Crowns</li>
                <li>All Ceramic Crowns with Warranty</li>
                <li>Dental Smile Design</li>
                <li>Aesthetic Metal Free Crowns</li>
                <li>All Prosthodontic Works</li>
                <li>All Ceramic Prosthesis</li>
                <li>Crowns (Metal, Ceramic)</li>
                <li>CAD CAM</li>
                <li>Full Mouth Rehabilitation with Dental Implants</li>
                <li>CAD CAM Prosthesis</li>
                <li>All Kinds of Fillings</li>
                <li>Restorative & Cosmetic Procedures</li>
                <li>3 Unit Bridge</li>
                <li>Composite Restorations (Tooth Coloured Fillings)</li>
                <li>Alignment of Crooked & Protruding Teeth</li>
                <li>Alginate Impressions</li>
                <li>Implant and Implant Prosthesis</li>
                <li>Advanced Digital Diagnostics</li>
                <li>3M Lava & Procera Crown</li>
                <li>Cosmetic Dental Procedures</li>
                <li>Immediate Loading Implantology</li>
                <li>Dental Prosthetics</li>
                <li>Bleaching of Discolored Teeth</li>
                <li>Endodontic Dentistry</li>
                <li>Computerised Digital X-Ray</li>
                <li>Dental Laminates</li>
                <li>Composite Bondings</li>
                <li>Cast Partial Denture</li>
                <li>Fixed Prosthodontics</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-dental-dark-gray mb-2">Tests</h3>
              <p className="text-sm text-gray-600">✔️ Dental screening and prophylaxis</p>
              <p className="text-sm text-gray-600">✔️ X ray radiograph- 2D </p>
              <p className="text-sm text-gray-600">✔️ 3D imaging</p>

            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-dental-dark-gray mb-2">Clinic Address</h3>
              <p className="text-sm text-gray-600">
                Dr. Prabha's Dental Clinic<br />
                No. 1/70, First Floor, Near Sathya Agency and Hotel Pandian,<br />
                Sivabootham, Poonamallee High Road, Vanagaram - 600095
              </p>
            </div>

            <Button asChild className="bg-dental-blue hover:bg-blue-600"  onClick={handlePhoneCall} >
              <a href="">Contact Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
