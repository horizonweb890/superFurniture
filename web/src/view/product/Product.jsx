import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useEffect } from 'react';
import axios from 'axios'
import { request } from '../../App';



const categories = ['All', 'Sofa', 'Bed', 'Chair', 'Table'];
const priceRanges = ['All', 'Under Nprs300', 'Nprs300-Nprs600', 'Nprs600-Nprs1000', 'Over Nprs1000'];

const ProductPage = () => {

//   const data =  async() =>{
//     try{
// const val = await axios.get(`http://successitworld.com/sub/api/v1/product`);
// console.log(val.data)
//     }catch(err){
//       console.log(err)
//     }
//   }  
//   useEffect(()=>{
//     data()
//   }, [])


  const [product, setProduct] = useState([]);
  const getProductData = async () => {
    try {
      const response = await axios.get(`${request}/api/v1/product`);
      setProduct(response.data); 
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filterProducts = () => {
    return product.filter(item => {
      const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || item.category.name === selectedCategory;

      let matchesPrice = true;
      if (selectedPriceRange === 'Under Nprs300') {
        matchesPrice = item.price < 300;
      } else if (selectedPriceRange === 'Nprs300-Nprs600') {
        matchesPrice = item.price >= 300 && item.price <= 600;
      } else if (selectedPriceRange === 'Nprs600-Nprs1000') {
        matchesPrice = item.price > 600 && item.price <= 1000;
      } else if (selectedPriceRange === 'Over Nprs1000') {
        matchesPrice = item.price > 1000;
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  };

  return (
    <div className="py-12 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center mb-8">Our Products</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border hover:bg-gray-100 transition-colors"
            >
              <SlidersHorizontal size={20} />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category}
                        className={`px-3 py-1 rounded-full ${
                          selectedCategory === category
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Price Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map(range => (
                      <button
                        key={range}
                        className={`px-3 py-1 rounded-full ${
                          selectedPriceRange === range
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        onClick={() => setSelectedPriceRange(range)}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filterProducts().map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={item.productImage}
                alt={item.productName}
                className="w-full h-48 object-cover hover:scale-105 transition-transform"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.productName}</h3>
                <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-500 font-bold">{item.price}</span>
                  <span className="text-sm text-gray-500">Rating: {item.rating}/5</span>
                </div>
                <Link
                  to={`/products/${item._id}`}
                  className="block mt-4 text-center bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filterProducts().length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No products found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;