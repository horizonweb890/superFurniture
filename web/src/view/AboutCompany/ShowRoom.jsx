import React from 'react';
import { Users, Award, Clock, Truck, Star, ArrowRight } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { 
      icon: <Users className="w-8 h-8" />,
      value: "10,000+",
      label: "Happy Customers"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "25+",
      label: "Years Experience"
    },
    {
      icon: <Star className="w-8 h-8" />,
      value: "4.8/5",
      label: "Customer Rating"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      value: "1,000+",
      label: "Monthly Deliveries"
    }
  ];

  const values = [
    {
      title: "Quality Craftsmanship",
      description: "Every piece is crafted with attention to detail and premium materials, ensuring lasting beauty and durability."
    },
    {
      title: "Sustainable Practices",
      description: "We're committed to eco-friendly manufacturing and sourcing, using responsibly harvested wood and recyclable materials."
    },
    {
      title: "Customer First",
      description: "Your satisfaction is our priority. We provide personalized service and support throughout your furniture journey."
    },
    {
      title: "Innovation",
      description: "We continuously evolve our designs and processes to bring you the latest in furniture trends and technology."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Emma Davis",
      role: "Production Director",
      image: "/api/placeholder/300/300"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative h-[500px] overflow-hidden">
        <img
          src="/api/placeholder/1920/500"
          alt="Furniture workshop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl font-bold mb-6">Crafting Your Perfect Space</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Since 1998, we've been creating beautiful, functional furniture 
              that brings life to your home and office spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Founded in 1998, our journey began in a small workshop with a simple vision: 
              to create furniture that combines exceptional craftsmanship with contemporary design. 
              Today, we've grown into a leading furniture manufacturer, but our commitment to 
              quality and attention to detail remains unchanged.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Every piece of furniture we create tells a story of dedication, skill, and passion. 
              Our team of master craftsmen brings decades of experience and artistic vision to 
              every project, ensuring that each item not only meets but exceeds our customers' 
              expectations.
            </p>
            <button className="flex items-center gap-2 text-yellow-500 hover:text-yellow-600 font-semibold">
              Learn More About Our Process
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/api/placeholder/300/400" alt="Workshop" className="rounded-lg" />
            <img src="/api/placeholder/300/400" alt="Craftsmanship" className="rounded-lg mt-8" />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 text-yellow-500 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-yellow-500 text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">Let's Create Something Beautiful Together</h2>
          <p className="text-xl mb-8">
            Visit our showroom or schedule a consultation with our design experts
          </p>
          <button className="bg-white text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>

      {/* Showroom Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Visit Our Showroom</h2>
            <p className="text-gray-600 mb-6">
              Experience our furniture in person at our state-of-the-art showroom. 
              Our design consultants are ready to help you find the perfect pieces 
              for your space.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-yellow-500 mt-1" />
                <div>
                  <h3 className="font-semibold">Opening Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 10:00 AM - 7:00 PM<br />
                    Sunday: 11:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
              <button className="bg-yellow-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                Get Directions
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/api/placeholder/300/300" alt="Showroom 1" className="rounded-lg" />
            <img src="/api/placeholder/300/300" alt="Showroom 2" className="rounded-lg mt-8" />
            <img src="/api/placeholder/300/300" alt="Showroom 3" className="rounded-lg" />
            <img src="/api/placeholder/300/300" alt="Showroom 4" className="rounded-lg mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;