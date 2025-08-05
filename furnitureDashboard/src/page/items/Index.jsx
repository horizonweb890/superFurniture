import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaStar } from 'react-icons/fa';
import Swal from 'sweetalert2';
import ProductForm from './Form';
import { request } from '../../App';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${request}/api/v1/product`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Map data immediately after fetching
      const formattedData = data.map(item => ({
        _id: String(item._id || ''),
        productName: String(item.productName || ''),
        category: item.category?.name ? String(item.category.name) : '',
        description: String(item.description || ''),
        price: Number(item.price || 0),
        rating: Number(item.rating || 0),
        productImage: String(item.productImage || '')
      }));

      setProducts(formattedData);
    } catch (err) {
      console.error('Error fetching products:', err);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch products. Please try again later.',
        icon: 'error'
      });
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await fetch(`${request}/api/v1/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const savedProduct = await response.json();

      // Format the saved product before adding to state
      const formattedProduct = {
        _id: String(savedProduct._id || ''),
        productName: String(savedProduct.productName || ''),
        category: savedProduct.category?.name ? String(savedProduct.category.name) : '',
        description: String(savedProduct.description || ''),
        price: Number(savedProduct.price || 0),
        rating: Number(savedProduct.rating || 0),
        productImage: String(savedProduct.productImage || '')
      };

      setProducts(prevProducts => [...prevProducts, formattedProduct]);
      setIsModalOpen(false);

      Swal.fire({
        title: 'Success!',
        text: 'Product added successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add product. Please try again.',
        icon: 'error'
      });
    }
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(`${request}/api/v1/product/${updatedProduct._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updated = await response.json();

      // Format updated product before updating state
      const formattedUpdated = {
        _id: String(updated._id || ''),
        productName: String(updated.productName || ''),
        category: updated.category?.name ? String(updated.category.name) : '',
        description: String(updated.description || ''),
        price: Number(updated.price || 0),
        rating: Number(updated.rating || 0),
        productImage: String(updated.productImage || '')
      };

      setProducts(prevProducts =>
        prevProducts.map(product =>
          product._id === formattedUpdated._id ? formattedUpdated : product
        )
      );

      setIsModalOpen(false);
      setEditingProduct(null);

      Swal.fire({
        title: 'Success!',
        text: 'Product updated successfully',
        icon: 'success'
      });
    } catch (error) {
      console.error('Error updating product:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to update product. Please try again.',
        icon: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const response = await fetch(`${request}/api/v1/product/${id}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        setProducts(products.filter(item => item._id !== id));

        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success'
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete product. Please try again.',
        icon: 'error'
      });
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !filterCategory || product.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch = !searchTerm ||
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const RatingStars = ({ rating }) => {
    const ratingNumber = Number(rating) || 0;
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(ratingNumber) ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">{ratingNumber.toFixed(1)}</span>
      </div>
    );
  };

  const openEditModal = (product) => {
    setEditingProduct({
      ...product,
      price: Number(product.price),
      rating: Number(product.rating)
    });
    setIsModalOpen(true);
  };

  return (
    <main className="lg:ml-64 min-h-screen bg-gray-100">
      <div className="p-6 mt-16">
        <div className="w-full max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Furniture Products</h1>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative w-full md:w-64">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <select
                onChange={(e) => setFilterCategory(e.target.value)}
                value={filterCategory}
                className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                <option value="Chair">Chair</option>
                <option value="Table">Table</option>
                <option value="Sofa">Sofa</option>
              </select>
            </div>

            <button
              onClick={() => {
                setIsModalOpen(true);
                setEditingProduct(null);
              }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Product Name</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Price</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Rating</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Description</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={String(product._id)} className="hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <img
                          src={product.productImage || '/api/placeholder.jpg'}
                          alt={product.productName}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      </td>
                      <td className="py-4 px-6 text-gray-900">{product.productName}</td>
                      <td className="py-4 px-6 text-gray-900">{product.category}</td>
                      <td className="py-4 px-6 text-gray-900">${product.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <RatingStars rating={product.rating} />
                      </td>
                      <td className="py-4 px-6 text-gray-600">{product.description}</td>
                      <td className="py-4 px-6 text-center space-x-2">
                        <button onClick={() => openEditModal(product)} className="text-blue-600 hover:text-blue-800">
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductForm
          onSave={editingProduct ? handleUpdateProduct : handleAddProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
          initialValues={editingProduct || {
            productName: '',
            category: '',
            description: '',
            price: '',
            rating: 0,
            productImage: ''
          }}
        />
      )}
    </main>
  );
};

export default ProductManagement;
