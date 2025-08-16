import React from "react";
import {
  FiHelpCircle,
  FiMessageCircle,
  FiPhone,
  FiMail,
  FiClock,
  FiTool,
} from "react-icons/fi";

const FAQ = () => {
  const faqCategories = [
    {
      title: "Rental Process",
      icon: FiHelpCircle,
      questions: [
        {
          question: "What documents do I need to apply for an apartment?",
          answer:
            "You will need a valid government-issued ID, proof of income (pay stubs or employment letter), bank statements, and references from previous landlords if applicable.",
        },
        {
          question: "How long does the application process take?",
          answer:
            "Our application review process typically takes 24-48 hours once we receive all required documents. We will contact you as soon as a decision is made.",
        },
        {
          question: "What is the security deposit amount?",
          answer:
            "Security deposits are typically equivalent to one month's rent. This amount may vary based on credit history and other factors.",
        },
        {
          question: "Can I view the apartment before applying?",
          answer:
            "Yes! We encourage all prospective tenants to schedule a viewing. Contact us to arrange a convenient time for a tour.",
        },
      ],
    },
    {
      title: "Living in Our Properties",
      icon: FiTool,
      questions: [
        {
          question: "What amenities are included in the rent?",
          answer:
            "Most of our properties include water, high-speed internet, access to fitness centers, swimming pools, and 24/7 security. Specific amenities vary by property.",
        },
        {
          question: "Are pets allowed?",
          answer:
            "Yes, we are pet-friendly! We welcome cats and dogs with a monthly pet fee and required pet deposit. Breed restrictions may apply.",
        },
        {
          question: "How do I report maintenance issues?",
          answer:
            "You can report maintenance requests through our tenant portal, mobile app, or by calling our maintenance hotline. Emergency issues are handled 24/7.",
        },
        {
          question: "Is parking included?",
          answer:
            "Most apartments include one parking space. Additional spaces may be available for rent based on availability.",
        },
      ],
    },
    {
      title: "Payments & Policies",
      icon: FiClock,
      questions: [
        {
          question: "When is rent due?",
          answer:
            "Rent is due on the 1st of each month. A grace period may apply as specified in your lease agreement. Late fees apply after the grace period.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept online payments, bank transfers, certified checks, and money orders. Credit card payments may be accepted with additional fees.",
        },
        {
          question: "Can I pay rent online?",
          answer:
            "Yes! Our tenant portal allows secure online rent payments, and you can set up automatic payments for convenience.",
        },
        {
          question: "What happens if I need to break my lease early?",
          answer:
            "Early lease termination may be possible with proper notice and fees as outlined in your lease agreement. Contact our office to discuss your situation.",
        },
      ],
    },
  ];

  const contactMethods = [
    {
      title: "General Inquiries",
      icon: FiMessageCircle,
      method: "Live Chat",
      description: "Available 9 AM - 6 PM, Monday to Friday",
      action: "Start Chat",
    },
    {
      title: "Phone Support",
      icon: FiPhone,
      method: "+1 (555) 123-4567",
      description: "Available 24/7 for emergencies",
      action: "Call Now",
    },
    {
      title: "Email Support",
      icon: FiMail,
      method: "support@premiumapartments.com",
      description: "Response within 24 hours",
      action: "Send Email",
    },
  ];

  return (
    <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8 lg:mt-15 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-8 backdrop-blur-sm border border-secondary/20">
            <FiHelpCircle className="text-3xl text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-6 rounded-full"></div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Find answers to common questions about our rental process,
            amenities, and policies.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className="glass-dark rounded-3xl p-8 border border-secondary/10"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mr-4">
                  <category.icon className="text-xl text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {category.title}
                </h2>
              </div>

              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div
                    key={faqIndex}
                    className="border-b border-secondary/10 pb-6 last:border-b-0 last:pb-0"
                  >
                    <h3 className="text-lg font-semibold text-white mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Methods */}
        <div className="glass-dark rounded-3xl p-8 border border-secondary/10 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-text-secondary">
              Can't find what you're looking for? Our support team is here to
              help!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 border border-secondary/5 text-center hover:border-secondary/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <method.icon className="text-xl text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {method.title}
                </h3>
                <p className="text-secondary font-medium mb-2">
                  {method.method}
                </p>
                <p className="text-text-muted text-sm mb-4">
                  {method.description}
                </p>
                <button className="btn-outline w-full">{method.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="glass-dark rounded-3xl p-8 border border-secondary/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Tips for New Residents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Download our tenant app for easy rent payments and maintenance
                  requests
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Save our emergency contact number in your phone for urgent
                  issues
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Join our resident community groups to connect with neighbors
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Review your lease agreement and keep a copy for your records
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Familiarize yourself with building amenities and their
                  operating hours
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-text-secondary">
                  Set up renter's insurance to protect your personal belongings
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
