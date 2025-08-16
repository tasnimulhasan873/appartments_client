import React from "react";
import {
  FiShield,
  FiLock,
  FiEye,
  FiDatabase,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: FiDatabase,
      content: [
        "Personal information you provide when registering or applying for apartments",
        "Contact information including name, email address, and phone number",
        "Property preferences and rental history",
        "Payment information for security deposits and rent payments",
        "Communication records and customer service interactions",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: FiEye,
      content: [
        "To process your apartment applications and rental agreements",
        "To communicate with you about available properties and services",
        "To improve our services and customer experience",
        "To comply with legal obligations and property management requirements",
        "To send you important updates about your tenancy or our services",
      ],
    },
    {
      title: "Information Security",
      icon: FiLock,
      content: [
        "We implement industry-standard security measures to protect your data",
        "All payment information is encrypted and processed securely",
        "Access to your personal information is restricted to authorized personnel only",
        "We regularly update our security protocols and conduct security audits",
        "Your data is stored on secure servers with backup and recovery systems",
      ],
    },
    {
      title: "Your Rights",
      icon: FiShield,
      content: [
        "You have the right to access your personal information we hold",
        "You can request corrections to any inaccurate information",
        "You may request deletion of your data subject to legal requirements",
        "You can opt-out of marketing communications at any time",
        "You have the right to file a complaint about our data practices",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-8 backdrop-blur-sm border border-secondary/20">
            <FiShield className="text-3xl text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-6 rounded-full"></div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information.
          </p>
        </div>

        {/* Last Updated */}
        <div className="glass-dark rounded-2xl p-6 border border-secondary/10 mb-8">
          <p className="text-text-muted text-center">
            <strong className="text-secondary">Last Updated:</strong> August 16,
            2025
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="glass-dark rounded-3xl p-8 border border-secondary/10"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mr-4">
                  <section.icon className="text-xl text-secondary" />
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>

              <ul className="space-y-4">
                {section.content.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 mr-4 flex-shrink-0"></div>
                    <p className="text-text-secondary leading-relaxed">
                      {item}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Section */}
          <div className="glass-dark rounded-3xl p-8 border border-secondary/10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Contact Us About Privacy
            </h2>
            <p className="text-text-secondary mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy or how we
              handle your data, please don't hesitate to contact us using the
              information below.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 glass rounded-xl border border-secondary/5">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <FiMail className="text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-white">Email Us</p>
                  <p className="text-text-muted text-sm">
                    privacy@premiumapartments.com
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 glass rounded-xl border border-secondary/5">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <FiPhone className="text-secondary" />
                </div>
                <div>
                  <p className="font-medium text-white">Call Us</p>
                  <p className="text-text-muted text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
