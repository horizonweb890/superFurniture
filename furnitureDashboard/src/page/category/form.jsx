import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { request } from '../../App';

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${request}/api/v1/furniture/category`);
      setCategories(response.data);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to fetch categories',
        icon: 'error',
      });
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode && editingCategoryId) {
        // Update category
        const response = await axios.patch(
          `${request}/api/v1/category/${editingCategoryId}`,
          {
            name: formData.name,
            description: formData.description,
          }
        );

        Swal.fire({
          title: 'Success!',
          text: 'Category updated successfully',
          icon: 'success',
        });
      } else {
        // Create new category
        const response = await axios.post(`${request}/api/v1/category`, formData);

        Swal.fire({
          title: 'Success!',
          text: 'Category created successfully',
          icon: 'success',
        });
      }

      // Reset form and state
      setFormData({ name: '', description: '' });
      setIsModalOpen(false);
      setIsEditMode(false);
      setEditingCategoryId(null);

      // Refresh categories
      fetchCategories();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to save category',
        icon: 'error',
      });
    }
  };

  // Handle edit
  const handleEdit = (category) => {
    setFormData({
      name: category.name,
      description: category.description,
    });
    setIsEditMode(true);
    setEditingCategoryId(category._id);
    setIsModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to undo this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${request}/api/v1/category/${id}`);
          Swal.fire({
            title: 'Deleted!',
            text: 'Category has been deleted.',
            icon: 'success',
          });
          fetchCategories();
        } catch (error) {
          Swal.fire({
            title: 'Error!',
            text: 'Failed to delete category',
            icon: 'error',
          });
        }
      }
    });
  };

  return (
    <main className="lg:ml-64 min-h-screen bg-gray-100">
      <div className="p-6 mt-16">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-gray-800">Categories</h3>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsEditMode(false);
              setFormData({ name: '', description: '' });
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add Category
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <table className="w-full table-auto text-gray-700">
            <thead className="bg-gray-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Category Name</th>
                <th className="py-3 px-4 text-left">Description</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id} className="border-t">
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">{category.description}</td>
                  <td className="py-3 px-4 flex">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex items-center px-2 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 mr-2"
                    >
                      <FaEdit className="mr-1" />
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="flex items-center px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <FaTrashAlt className="mr-1" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                {isEditMode ? 'Edit Category' : 'Add Category'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-700">
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-lg font-medium mb-2 text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                  ></textarea>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    {isEditMode ? 'Update' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;
