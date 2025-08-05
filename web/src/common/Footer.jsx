import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Furniture Nepal</h3>
            <p className="text-gray-400 mb-4">
              Bringing you high-quality furniture at affordable prices. Enhance your home with our stylish and durable pieces.
            </p>
            <div className="flex space-x-6 mt-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-yellow-500">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-yellow-500">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-yellow-500">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" className="text-gray-400 hover:text-yellow-500">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-400">
              <li><a href="/" className="hover:text-yellow-500">Home</a></li>
              <li><a href="/about" className="hover:text-yellow-500">About Us</a></li>
              <li><a href="/products" className="hover:text-yellow-500">Products</a></li>
              <li><a href="/contact" className="hover:text-yellow-500">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p className="text-gray-400 mb-4">
              <strong>Email:</strong> support@furniturenepal.com
            </p>
            <p className="text-gray-400">
              <strong>Phone:</strong> +977-123-456-789
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; 2024 Furniture Nepal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
