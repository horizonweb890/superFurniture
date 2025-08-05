import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { request } from '../App';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    contact:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      contact: formData.contact,
    };

    try {
      const response = await axios.post(`${request}/api/v1/contact`, payload);

      setLoading(false);
      setSuccess('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '', contact: "" });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your message has been sent successfully!',
      });

    } catch (error) {
      setLoading(false);
      setError('There was an error submitting your message. Please try again.');

      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'There was an issue sending your message. Please try again.',
      });
    }
  };
  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-2xl  ">
            <h3 className="text-2xl font-semibold mb-4">Get In Touch</h3>
            <div className="mb-4 flex items-center gap-2">
              <FaPhone size={24} className="text-yellow-500" />
              <span className="text-lg">+123 456 7890</span>
            </div>
            <div className="mb-4 flex items-center gap-2">
              <FaEnvelope size={24} className="text-yellow-500" />
              <span className="text-lg">info@company.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt size={24} className="text-yellow-500" />
              <span className="text-lg">123 Street, City, Country</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6  ">
            <h3 className="text-2xl font-semibold mb-4">Send Us A Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-lg font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium mb-2">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-lg font-medium mb-2">Contact</label>
                <input
                  type="contact"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-lg font-medium mb-2">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors transform hover:scale-105"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            {success && <p className="mt-4 text-green-500">{success}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
