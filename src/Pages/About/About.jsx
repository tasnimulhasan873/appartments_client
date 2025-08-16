import React from "react";
import {
  FiHome,
  FiUsers,
  FiAward,
  FiShield,
  FiTarget,
  FiHeart,
  FiMapPin,
  FiPhone,
  FiMail,
} from "react-icons/fi";

const About = () => {
  const stats = [
    { icon: FiHome, value: "500+", label: "Happy Residents" },
    { icon: FiUsers, value: "15+", label: "Years Experience" },
    { icon: FiAward, value: "50+", label: "Awards Won" },
    { icon: FiShield, value: "24/7", label: "Security" },
  ];

  const values = [
    {
      icon: FiTarget,
      title: "Our Mission",
      description:
        "To provide premium living experiences that exceed expectations while fostering a sense of community and belonging for all our residents.",
    },
    {
      icon: FiHeart,
      title: "Our Values",
      description:
        "Excellence, integrity, and innovation guide everything we do. We believe in creating spaces where people can truly call home.",
    },
    {
      icon: FiShield,
      title: "Our Commitment",
      description:
        "We are committed to maintaining the highest standards of service, security, and comfort for our residents around the clock.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Managing Director",
      image: "/team/sarah.jpg",
      description:
        "With 20+ years in real estate, Sarah leads our vision for premium living experiences.",
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image: "/team/michael.jpg",
      description:
        "Michael ensures our properties run smoothly with his expertise in facility management.",
    },
    {
      name: "Emily Rodriguez",
      role: "Resident Relations",
      image: "/team/emily.jpg",
      description:
        "Emily is dedicated to creating exceptional experiences for all our residents.",
    },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative bg-primary py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-surface/20 to-primary"></div>
        <div className="absolute top-20 left-12 w-32 h-32 bg-secondary/8 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/5 rounded-full blur-2xl animate-float-delay"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-secondary/20 to-white/10 rounded-full mb-8 backdrop-blur-sm border border-secondary/20">
            <FiHome className="text-3xl text-secondary" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            About Our <span className="text-secondary">Community</span>
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-white mx-auto mb-8 rounded-full"></div>

          <p className="text-text-secondary text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed">
            Creating exceptional living experiences through innovative design,
            premium amenities, and a commitment to excellence that has defined
            us for over a decade.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="glass-dark rounded-2xl p-6 sm:p-8 border border-secondary/10 hover:border-secondary/20 transition-all duration-300 hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                    <stat.icon className="text-2xl sm:text-3xl text-secondary" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-text-muted font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              What Drives Us
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="glass-dark rounded-3xl p-8 border border-secondary/10 hover:border-secondary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <value.icon className="text-2xl text-secondary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-secondary to-white mx-auto rounded-full mb-6"></div>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Our dedicated team works tirelessly to ensure your living
              experience exceeds expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="glass-dark rounded-3xl overflow-hidden border border-secondary/10 hover:border-secondary/20 transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-surface to-card-bg flex items-center justify-center">
                  <div className="text-center">
                    <FiUsers className="text-4xl text-secondary/50 mb-2 mx-auto" />
                    <p className="text-text-muted text-sm">Team Member Photo</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-medium mb-4">
                    {member.role}
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-dark rounded-3xl p-8 sm:p-12 border border-secondary/10">
            <FiHeart className="text-4xl text-secondary mx-auto mb-6" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Ready to Make This Your Home?
            </h2>
            <p className="text-text-secondary text-lg mb-8 leading-relaxed">
              Join our community of satisfied residents and experience the
              difference of premium living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                <FiMapPin className="mr-2" />
                Schedule a Tour
              </button>
              <button className="btn-outline">
                <FiPhone className="mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
