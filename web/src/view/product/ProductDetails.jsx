import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Star, ArrowLeft } from 'lucide-react';
import { request } from '../../App';

const ProductDetailPage = () => {
  const { id } = useParams();
  console.log(id)
  const [productss, setProducts] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const getData = async (id) => {
    try {
      const response = await axios.get(`${request}/api/v1/product/${id}`);
      setProducts(response.data);  
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData(id);
  }, [id]);

  if (!productss || !productss._id) {
    return (
      <div className="py-12 bg-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
          <Link to="/products" className="text-yellow-500 hover:text-yellow-600 mt-4 inline-block">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={20}
        className={`${index < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-gray-800 mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-6">
          <div className="space-y-4">
            <img
              src={productss.productImage}
              alt={productss.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{productss.productName}</h1>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-700">Category: {productss.category.name}</h2>
              <p className="text-gray-600 mt-2">{productss.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {renderStars(productss.rating)}
                <span className="ml-2 text-gray-600">({productss.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold text-gray-800">${productss.price.toFixed(2)}</p>

            {/* Post Date */}
            <div className="flex items-center gap-2 mt-4">
              <h3 className="font-semibold mb-2">Post On</h3>
              <p className="text-gray-800">{productss.createdAt}</p>
            </div>

            {/* Contact Button */}
            <div className="mt-6">
              <Link 
                to="/contact" 
                className="w-full bg-yellow-500 text-white py-3 rounded-lg px-8 hover:bg-yellow-600 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                Contact for this Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
