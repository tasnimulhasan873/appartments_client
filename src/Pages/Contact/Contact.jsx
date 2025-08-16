import React, { useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiUser,
  FiMessageSquare,
} from "react-icons/fi";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-primary font-['Inter'] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-4 h-4 rounded-full bg-blurPurple blur-sm animate-float"></div>
          <div className="absolute bottom-1/4 right-16 w-6 h-6 rounded-full bg-primary-light/20 blur-sm animate-float-delay"></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-primary-light/40 blur-sm animate-pulse"></div>
        </div>

        <Fade triggerOnce duration={800}>
          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Get In <span className="text-primary-light">Touch</span>
            </h1>
            <div className="w-24 h-1 bg-primary-light mx-auto mb-6 rounded-full"></div>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              Have questions about our building management system? We're here to
              help! Reach out to us and we'll get back to you as soon as
              possible.
            </p>
          </div>
        </Fade>
      </section>

      {/* Contact Content */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <Fade triggerOnce direction="left" duration={600}>
              <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-light to-primary p-3 rounded-full">
                      <FiMapPin className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Address
                      </h3>
                      <p className="text-white/80">
                        123 Building Management Street
                        <br />
                        Business District, City
                        <br />
                        State 12345, Country
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary to-primary-dark p-3 rounded-full">
                      <FiPhone className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Phone
                      </h3>
                      <p className="text-white/80">
                        Main: +1 (555) 123-4567
                        <br />
                        Support: +1 (555) 123-4568
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-dark to-primary-light p-3 rounded-full">
                      <FiMail className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Email
                      </h3>
                      <p className="text-white/80">
                        General: info@bms.com
                        <br />
                        Support: support@bms.com
                      </p>
                    </div>
                  </div>

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-primary-light to-primary-dark p-3 rounded-full">
                      <FiClock className="text-white text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Business Hours
                      </h3>
                      <p className="text-white/80">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                        <br />
                        Sunday: Emergency support only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-8 p-6 bg-gradient-to-r from-primary-dark/20 to-primary-light/20 rounded-xl border border-primary-light/30">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    24/7 Emergency Support
                  </h3>
                  <p className="text-white/80 mb-3">
                    For urgent building maintenance or security issues:
                  </p>
                  <p className="text-primary-light font-semibold text-lg">
                    📞 +1 (555) 911-HELP
                  </p>
                </div>
              </div>
            </Fade>

            {/* Contact Form */}
            <Fade triggerOnce direction="right" duration={600}>
              <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl p-8 sm:p-10">
                <h2 className="text-3xl font-bold text-white mb-8">
                  Send Us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <FiUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-glow rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-light focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <FiMail className="inline mr-2" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-glow rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-light focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <FiPhone className="inline mr-2" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-glow rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-light focus:bg-white/20 transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-glow rounded-lg text-white focus:outline-none focus:border-primary-light focus:bg-white/20 transition-all duration-300"
                    >
                      <option value="" className="bg-primary text-white">
                        Select a subject
                      </option>
                      <option value="general" className="bg-primary text-white">
                        General Inquiry
                      </option>
                      <option value="support" className="bg-primary text-white">
                        Technical Support
                      </option>
                      <option value="billing" className="bg-primary text-white">
                        Billing Question
                      </option>
                      <option
                        value="maintenance"
                        className="bg-primary text-white"
                      >
                        Maintenance Request
                      </option>
                      <option value="other" className="bg-primary text-white">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <FiMessageSquare className="inline mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-glow rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary-light focus:bg-white/20 transition-all duration-300 resize-vertical"
                      placeholder="Enter your message here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-light to-primary text-white font-bold rounded-lg hover:from-primary hover:to-primary-dark transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    <FiSend className="text-lg" />
                    Send Message
                  </button>
                </form>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <Zoom triggerOnce duration={600}>
          <div className="max-w-7xl mx-auto">
            <div className="bg-overlay backdrop-blur-lg rounded-2xl sm:rounded-3xl border border-glow shadow-2xl overflow-hidden">
              <div className="p-8 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Find Us</h2>
                <p className="text-white/80 mb-6">
                  Visit our office for in-person consultations and support
                </p>
                {/* You can integrate Google Maps or any other map service here */}
                <div className="bg-primary/20 rounded-lg p-16 border border-primary-light/30">
                  <FiMapPin className="text-primary-light text-6xl mx-auto mb-4" />
                  <p className="text-white/80">Interactive Map Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </Zoom>
      </section>
    </div>
  );
};

export default Contact;
