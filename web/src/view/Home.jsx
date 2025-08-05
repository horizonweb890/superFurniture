// HomePage.js
import React, { useState } from 'react';
import axios from 'axios';
import furniture from "../assets/furniture.jpg";
import bed from "../assets/bed.jpg";
import cobed from "../assets/hom.jpg";
import sofa from "../assets/sofa.jpg";
import cozzy1 from "../assets/cozzy1.jpg";
import cozzy2 from "../assets/cozzy2.png";
import cozzy3 from "../assets/cozzy3.jpg";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { request } from '../App';

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      name: formData.name,
      email: formData.email,
      description: formData.message,
    };

    try {
      const response = await axios.post(`${request}/api/v1/contact`, payload);
      setLoading(false);
      setSuccess('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });

      Swal.fire({
        icon: 'success',
        title: 'Message Sent!',
        text: 'Thank you for reaching out. We will get back to you soon.',
        confirmButtonColor: '#f59e0b',
      });
    } catch (error) {
      setLoading(false);
      setError('There was an error submitting your message. Please try again.');

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an issue sending your message. Please try again.',
        confirmButtonColor: '#e74c3c',
      });
    }
  };

  const features = [
    {
      image: cozzy1,
      title: "Quality Products",
      description: "Every piece is crafted with precision and designed to last for years.",
    },
    {
      image: cozzy2,
      title: "Affordable Prices",
      description: "We offer furniture that fits every budget without compromising on quality.",
    },
    {
      image: cozzy3,
      title: "Wide Variety",
      description: "Our selection includes a diverse range of styles to suit any taste.",
    },
  ];

  const [product, setProduct] = useState([])
  console.log(product, "ProductData")

  const getProductData = async()=>{
    try{
const getData = await axios.get(`${request}/api/v1/product`)
console.log(getData, "getData")
setProduct(getData.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getProductData()
  },[])
  

  return (
    <div className="bg-gray-100">
      <section
        className="bg-cover bg-center h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${furniture})`,
        }}
      >
        <div className="bg-black bg-opacity-50 p-8 rounded-lg w-full max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Furniture Nepal</h1>
          <p className="text-lg md:text-2xl mb-8">High-quality furniture at affordable prices</p>
          <Link
            to="/products"
            className="bg-yellow-500 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-yellow-400"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-12">
  <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
  <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {product?.slice(0, 4).map((product) => (
      <div key={product?.id} className="bg-white p-4 shadow rounded-lg">
        <img
          src={product?.productImage}
          alt={product?.productName || "Unknown Product"}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h3 className="text-xl font-semibold mb-2">{product?.productName || "Not KNOWN"}</h3>
        <p className="text-gray-600 mb-4">{product?.price}</p>
        <Link to={`/products`} className="text-yellow-500 font-semibold hover:text-yellow-400">
          View Details
        </Link>
      </div>
    ))}
  </div>
</section>


      <section className="bg-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center relative">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">About Us</h2>
          <p className="text-lg text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            At <span className="text-yellow-600 font-semibold">Furniture Nepal</span>, we believe that high-quality furniture should be affordable for everyone. Our collection spans a wide range of designs, blending style and durability to bring you furniture that enhances any room without breaking your budget.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <img src={feature.image} alt={feature.title} className="mx-auto mb-4 w-20 h-20 object-cover rounded-full" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


<section className="py-16 bg-white">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-800">What Our Customers Say</h2>
    <p className="text-lg text-gray-600 mb-10">
      Hear from our satisfied customers who love our products and services.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((review) => (
        <div key={review} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <p className="text-lg text-gray-700 italic mb-4">"Excellent service and high-quality products!"</p>
          <h4 className="font-semibold text-gray-800">Customer {review}</h4>
          <span className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gray-200">
  <div className="max-w-6xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-800">From Our Blog</h2>
    <p className="text-lg text-gray-600 mb-10">
      Discover the latest trends, tips, and insights on furniture and interior design.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((post) => (
        <div key={post} className="bg-white p-6 rounded-lg shadow-md">
          <img src={bed} alt="Blog Post" className="w-full h-48 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">Post Title {post}</h3>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <Link to={`/blog/${post}`} className="text-yellow-500 font-semibold hover:text-yellow-400">
            Read More
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-white">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Meet Our Team</h2>
    <p className="text-lg text-gray-600 mb-10">
      A dedicated team of professionals working to bring you the best.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((teamMember) => (
        <div key={teamMember} className="bg-gray-100 p-6 rounded-lg shadow-md">
          <img src={sofa} alt="Team Member" className="w-24 h-24 object-cover rounded-full mx-auto mb-4" />
          <h4 className="text-xl font-semibold mb-2">Team Member {teamMember}</h4>
          <p className="text-gray-600">Position {teamMember}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="py-16 bg-gray-100">
  <div className="max-w-5xl mx-auto px-4 text-center">
    <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Latest News</h2>
    <p className="text-lg text-gray-600 mb-10">
      Stay updated with the latest happenings and new arrivals.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {[1, 2, 3].map((news) => (
        <div key={news} className="bg-white p-6 rounded-lg shadow-md">
          <img src={cobed} alt="News" className="w-full h-48 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2">News Title {news}</h3>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
          <Link to={`/news/${news}`} className="text-yellow-500 font-semibold hover:text-yellow-400">
            Read More
          </Link>
        </div>
      ))}
    </div>
  </div>
</section>


      <section className="py-16 bg-gray-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6 text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-10">
            Have questions? Feel free to reach out! We’d love to hear from you.
          </p>
          <form className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>

            <div className="relative">
              <textarea
                placeholder="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-4 pl-12 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                rows="4"
              ></textarea>
              <FaComment className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
            </div>

            {loading && (
              <div className="text-center mt-4">
                <div className="spinner-border animate-spin text-yellow-500" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 font-semibold"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {error && <p className="text-red-500 text-center">{error}</p>}
            {success && <p className="text-green-500 text-center">{success}</p>}
          </form>
        </div>
      </section>


      
    </div>
  );
};

export default HomePage;
