import React from 'react';
// import { CheckCircle, Star, Heart, Tool, Leaf, Shield } from 'lucide-react';
// import { FaCheckCircle, FaStar, FaHeart, FaTool, FaLeaf, FaShieldAlt } from 'react-icons/fa';

import furniture from "../../assets/furniture.jpg";
import bed from "../../assets/bed.jpg";
import cobed from "../../assets/hom.jpg";
import sofa from "../../assets/sofa.jpg";
import cozzy1 from "../../assets/cozzy1.jpg";
import cozzy2 from "../../assets/cozzy2.png";
import cozzy3 from "../../assets/cozzy3.jpg"
import aboutCover from "../../assets/aboutCover.jpg"

const AboutPage = () => {
  const highlights = [
    {
    //   icon: <FaCheckCircle className="w-6 h-6" />,
      title: "Master Craftsmanship",
      description: "Each piece is handcrafted by skilled artisans with decades of experience"
    },
    {
    //   icon: <Leaf className="w-6 h-6" />,
      title: "Sustainable Materials",
      description: "We use responsibly sourced wood and eco-friendly materials"
    },
    {
    //   icon: <Heart className="w-6 h-6" />,
      title: "Timeless Design",
      description: "Our furniture combines classic elegance with modern functionality"
    },
    {
    //   icon: <Shield className="w-6 h-6" />,
      title: "Lifetime Guarantee",
      description: "We stand behind the quality of every piece we create"
    }
  ];

  const collections = [
    {
      name: "Living Room",
      description: "Elegant sofas, coffee tables, and accent pieces",
      image:cozzy2
    },
    {
      name: "Bedroom",
      description: "Luxurious beds, dressers, and nightstands",
      image: furniture
    },
    {
      name: "Dining Room",
      description: "Beautiful tables, chairs, and buffets",
      image: cozzy3
    }
  ];

  const features = [
    "Premium hardwoods and materials",
    "Customizable designs and finishes",
    "Expert white-glove delivery",
    "Comprehensive warranty coverage",
    "Professional design consultation",
    "Heirloom-quality construction"
  ];

  return (
    <div className="bg-white">
      <div className="relative h-[600px] overflow-hidden">
        <img
          src={cobed}
          alt="Luxury Furniture Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">
                Creating Beautiful Spaces Since 1998
              </h1>
              <p className="text-xl mb-8">
                Crafting exceptional furniture that transforms houses into homes, 
                blending timeless design with modern comfort.
              </p>
              <div className="flex gap-4">
                <button className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 transition-colors">
                  View Collections
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors">
                  Our Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              For over two decades, we've been passionate about creating furniture 
              that stands the test of time. What began as a small workshop has grown 
              into a renowned furniture atelier, but our commitment to quality craftsmanship 
              remains unchanged.
            </p>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Each piece of furniture we create is a testament to our dedication to 
              excellence. Our master craftsmen combine traditional techniques with 
              modern innovation to create pieces that are both beautiful and functional.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {highlights.slice(0, 2).map((highlight, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-yellow-500 mb-2">{highlight.icon}</div>
                  <h3 className="font-semibold mb-1">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img 
              src={aboutCover} 
              alt="Craftsmanship" 
              className="rounded-lg"
            />
            <img 
              src={cozzy1} 
              alt="Workshop" 
              className="rounded-lg mt-8"
            />
          </div>
        </div>
      </div>

      {/* Collections Overview */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-lg cursor-pointer"
              >
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end transition-opacity group-hover:bg-opacity-50">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                    <p className="text-sm opacity-90">{collection.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Craftsmanship Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src={aboutCover}
              alt="Furniture Craftsmanship"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl font-bold mb-8">The Art of Furniture Making</h2>
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  {/* <CheckCircle className="w-5 h-5 text-yellow-500" /> */}
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500 rounded-full mb-4">
                  {highlight.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-400">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative h-[400px] overflow-hidden my-8">
        <img
          src={furniture}
          alt="Luxury Furniture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h2 className="text-4xl font-bold mb-6">
              Transform Your Space Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover our collection of handcrafted furniture and create the home 
              you've always dreamed of.
            </p>
            <button className="bg-yellow-500 text-white px-8 py-3 rounded-md hover:bg-yellow-600 transition-colors">
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;