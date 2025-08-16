import React from "react";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiBook,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const TermsOfService = () => {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FiCheckCircle,
      content: [
        "By accessing and using our services, you agree to be bound by these Terms of Service",
        "These terms apply to all users, including tenants, prospective tenants, and visitors",
        "If you do not agree to these terms, please do not use our services",
        "We may update these terms from time to time, and continued use constitutes acceptance",
      ],
    },
    {
      title: "Property Application Process",
      icon: FiFileText,
      content: [
        "All applications must be completed truthfully and accurately",
        "Application fees are non-refundable regardless of approval status",
        "We reserve the right to verify all information provided in applications",
        "Approval is subject to credit checks, background verification, and reference checks",
        "False information may result in immediate disqualification",
      ],
    },
    {
      title: "Rental Obligations",
      icon: FiBook,
      content: [
        "Rent must be paid on time according to the lease agreement",
        "Late fees may apply for payments received after the due date",
        "Tenants are responsible for maintaining the property in good condition",
        "Any damages beyond normal wear and tear may result in charges",
        "Subletting or unauthorized occupancy is prohibited without written consent",
      ],
    },
    {
      title: "Prohibited Activities",
      icon: FiAlertCircle,
      content: [
        "No illegal activities or substances are permitted on the premises",
        "Excessive noise or disturbances that affect other residents",
        "Unauthorized modifications to the property structure or systems",
        "Commercial activities without prior written approval",
        "Violation of community rules and regulations",
      ],
    },
  ];

  const importantNotices = [
    {
      title: "Security Deposits",
      description:
        "Security deposits are held in accordance with local laws and will be returned within the legally required timeframe after lease termination, minus any applicable deductions.",
    },
    {
      title: "Property Inspections",
      description:
        "We reserve the right to inspect properties with reasonable notice as required by law and as specified in your lease agreement.",
    },
    {
      title: "Emergency Procedures",
      description:
        "In case of emergencies, contact emergency services first, then notify property management. Emergency contact information is provided in your lease documents.",
    },
  ];

  return (
    <div className="min-h-screen bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-8 backdrop-blur-sm border border-secondary/20">
            <FiFileText className="text-3xl text-secondary" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-6 rounded-full"></div>
          <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
            Please read these terms carefully as they govern your use of our
            services and rental properties.
          </p>
        </div>

        {/* Last Updated */}
        <div className="glass-dark rounded-2xl p-6 border border-secondary/10 mb-8">
          <p className="text-text-muted text-center">
            <strong className="text-secondary">Effective Date:</strong> August
            16, 2025
          </p>
        </div>

        {/* Main Terms Sections */}
        <div className="space-y-8 mb-12">
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
        </div>

        {/* Important Notices */}
        <div className="glass-dark rounded-3xl p-8 border border-secondary/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Important Notices
          </h2>
          <div className="space-y-6">
            {importantNotices.map((notice, index) => (
              <div
                key={index}
                className="border-b border-secondary/10 pb-6 last:border-b-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold text-secondary mb-3">
                  {notice.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {notice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="glass-dark rounded-3xl p-8 border border-secondary/10 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Legal Disclaimer
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              These Terms of Service constitute a legally binding agreement
              between you and our property management company. By using our
              services, you acknowledge that you have read, understood, and
              agree to be bound by these terms.
            </p>
            <p>
              We reserve the right to modify these terms at any time. Material
              changes will be communicated to users through appropriate
              channels. Continued use of our services after such modifications
              constitutes acceptance of the updated terms.
            </p>
            <p>
              These terms are governed by local and state laws. Any disputes
              arising from these terms will be resolved through the appropriate
              legal channels in the jurisdiction where the property is located.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="glass-dark rounded-3xl p-8 border border-secondary/10">
          <h2 className="text-2xl font-bold text-white mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            If you have any questions about these Terms of Service or need
            clarification on any provisions, please contact our legal
            department.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 glass rounded-xl border border-secondary/5">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <FiMail className="text-secondary" />
              </div>
              <div>
                <p className="font-medium text-white">Legal Department</p>
                <p className="text-text-muted text-sm">
                  legal@premiumapartments.com
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 glass rounded-xl border border-secondary/5">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <FiPhone className="text-secondary" />
              </div>
              <div>
                <p className="font-medium text-white">Legal Hotline</p>
                <p className="text-text-muted text-sm">
                  +1 (555) 123-4567 ext. 101
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
