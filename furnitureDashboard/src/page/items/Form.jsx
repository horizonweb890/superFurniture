import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { request } from '../../App';

const ProductForm = ({ onClose, categories, productToEdit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    price: '',
    rating: '',
    description: '',
  });

  console.log(productToEdit, "productataoaedit")

  const [cat, setCat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productImage, setImage] = useState(null);

  const getProductCategory = async () => {
    try {
      const response = await axios.get(`${request}/api/v1/category`);
      setCat(response.data); 
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getProductCategory();
  }, []);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        productName: productToEdit.productName,
        category: productToEdit.category,
        price: productToEdit.price,
        rating: productToEdit.rating,
        description: productToEdit.description,
      });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append('productName', formData.productName);
    data.append('category', formData.category);
    data.append('price', formData.price);
    data.append('rating', formData.rating);
    data.append('description', formData.description);
    if (productImage) {
      data.append('productImage', productImage); 
    }

    try {
      const response = productToEdit
        ? await axios.put(`${request}/api/v1/product/${productToEdit._id}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        : await axios.post(`${request}/api/v1/product`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

      Swal.fire({
        icon: 'success',
        title: productToEdit ? 'Product Updated' : 'Product Created',
        text: productToEdit ? 'The product has been updated successfully!' : 'The product has been added successfully!',
      });

      onClose(); 
    } catch (err) {
      setError('Failed to save product. Please try again.');
      console.error(err);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save product. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                placeholder="Enter product name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image
              </label>
              <input
                type="file"
                name="productImage"
                onChange={handleImageChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="" disabled>Select a category</option>
                {cat?.map((cate) => (
                  <option key={cate._id} value={cate._id}>{cate.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Enter rating (1-5)"
                min="1"
                max="5"
                step="0.1"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Saving...' : productToEdit ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
