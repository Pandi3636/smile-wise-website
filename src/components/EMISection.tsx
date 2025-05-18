import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EMISection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-16 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')" }}>
      <div className="absolute inset-0 bg-dental-dark-blue/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Easy Monthly Installments</h2>
          
          <p className="text-lg mb-8 font-raleway">
            We understand that quality dental care is an investment. That's why we offer flexible payment plans 
            through our Easy Monthly Installment options, making it convenient to get the treatment you need today.
          </p>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold mb-4 font-poppins">Why Choose Our EMI Plans?</h3>
            <ul className="space-y-3 text-left mb-6 font-raleway">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-dental-mint" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>0% interest options available</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-dental-mint" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Quick approval process</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-dental-mint" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Flexible payment terms (3, 6, 9, or 12 months)</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-dental-mint" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No hidden fees or charges</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-dental-mint" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Available for all major treatments</span>
              </li>
            </ul>
          </div>
          
          <Button 
            onClick={() => navigate('/emi-contact')}
            className="bg-dental-mint hover:bg-dental-light-mint text-dental-dark-blue font-semibold font-raleway px-8 py-3 rounded-lg transition-colors"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EMISection;
