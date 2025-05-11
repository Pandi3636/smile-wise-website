
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How often should I visit the dentist?",
    answer: "We recommend visiting the dentist every 6 months for a routine check-up and cleaning. However, if you have specific dental concerns or conditions, your dentist may recommend more frequent visits."
  },
  {
    question: "What's the best way to whiten my teeth?",
    answer: "Professional teeth whitening at our dental office provides the most effective and safest results. We also offer take-home whitening kits. Over-the-counter products may work to some extent but can sometimes cause sensitivity or uneven results."
  },
  {
    question: "Do you accept dental insurance?",
    answer: "Yes, we accept most major dental insurance plans. Please contact our office with your specific insurance details, and our team will verify your coverage and benefits before your appointment."
  },
  {
    question: "What should I do in case of a dental emergency?",
    answer: "For dental emergencies during office hours, call us immediately and we'll schedule you as soon as possible. If you're experiencing severe pain, bleeding, or trauma outside of office hours, please go to the nearest emergency room and then follow up with us."
  },
  {
    question: "How long do dental implants last?",
    answer: "With proper care and maintenance, dental implants can last a lifetime. The crown attached to the implant typically lasts 10-15 years before needing replacement due to normal wear and tear."
  },
  {
    question: "Is it normal to feel anxious about visiting the dentist?",
    answer: "Absolutely! Dental anxiety is very common. Our team is trained to help anxious patients feel comfortable. We offer various comfort measures and can discuss sedation options for those with severe anxiety."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 bg-dental-gray-soft">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dental-purple-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common dental questions. If you don't see your question here,
            feel free to contact us!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-dental-purple/20">
                <AccordionTrigger className="text-dental-purple-dark hover:text-dental-purple">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
        </div>
      </div>
    </section>
  );
};

export default FAQ;
