import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { request } from '../../App';
import { 
  Search, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical 
} from 'lucide-react';

const UserTable = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [sortOrder, setSortOrder] = useState('asc');

  const getContact = async () => {
    try {
      const { data } = await axios.get(`${request}/api/v1/contact`);
      setUserData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getContact();
  }, []);

  const filteredData = userData.filter((user) => {
    if (!user) return false;

    const searchFields = ['name', 'email', 'contact', 'description'];
    return searchFields.some(field => {
      const value = user[field] ?? '';
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase());
    });
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const sortData = (field) => {
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[field] ?? '';
      const bValue = b[field] ?? '';
      
      const comparison = aValue.toString().localeCompare(bValue.toString());
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    return sortedData;
  };

  return (
    <div className="bg-gray-50 lg:ml-64 my-8 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-3 sm:px-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
            <p className="text-xs text-gray-500">Manage and track user information</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No users found matching your search
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-100 border-b">
                <tr>
                  {['Name', 'Email', 'Contact', 'Description', 'Created At', 'Actions'].map((header, index) => (
                    <th 
                      key={header} 
                      className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${index < 3 ? 'cursor-pointer' : ''}`}
                      onClick={() => index < 3 && sortData(header.toLowerCase())}
                    >
                      {header}
                      {index < 3 && (sortOrder === 'asc' ? ' ↑' : ' ↓')}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((user) => (
                  <tr key={user?._id ?? Math.random()} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-xs font-medium text-gray-600">
                            {user?.name?.charAt(0).toUpperCase() ?? '?'}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{user?.name ?? 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user?.email ?? 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user?.contact ?? 'N/A'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500 truncate max-w-xs">{user?.description ?? 'No description'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <button className="text-blue-500 hover:bg-blue-50 p-1 rounded-full transition">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:bg-red-50 p-1 rounded-full transition">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-500 hover:bg-gray-100 p-1 rounded-full transition">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {filteredData.length > 0 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
                className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{' '}
                  <span className="font-medium">{startIndex + 1}</span>{' '}
                  to{' '}
                  <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredData.length)}</span>{' '}
                  of{' '}
                  <span className="font-medium">{filteredData.length}</span>{' '}
                  results
                </p>
              </div>

              <div>
                <nav className="inline-flex space-x-2">
                  <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`p-2 rounded-full transition ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTable;
