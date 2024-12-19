import React, { useState , useEffect} from 'react'
import logo from './cropPic.png'
import { ImSearch} from 'react-icons/im'
import { BsCart2 } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaBagShopping, FaShopify } from 'react-icons/fa6';
import { FiSearch } from "react-icons/fi";
import { allProductDetails } from './ProductsDetails';
import { RiLogoutCircleLine } from "react-icons/ri";
import { MdLockReset } from "react-icons/md";
import axios from 'axios';

export default function Header({wishList,updateWishList,cart,updateCart,setShowResetPassword,setFormSubmitted}) {
  const navigate = useNavigate();
  const [selected, setSelectedCategory] = useState('/');
  const handleButtonClick = (path) => {
    navigate(path);
  };
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory !== "Home") {
      navigate(selectedCategory);
    }
  };
  
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const handleSearchChange = (event) => {
    const input = event.target.value;
    setSearchTerm(input);

    if (input) {
      const filteredSuggestions = allProductDetails.filter((product) =>
        product.name.toLowerCase().includes(input.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };
  
  

  const handleSuggestionClick = (product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    navigate('/AddToCart', {
      state: {
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <div className='bg-gradient-to-r from-slate-700 to-teal-500'><div className="flex justify-center items-center gap-6 pt-8">
      <button
        className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
        onClick={() => setShowResetPassword(true)}
      >
        <MdLockReset className="text-2xl" />
        Reset Password
      </button>

      <button
        className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        onClick={() => setFormSubmitted(false)}
      >
        <RiLogoutCircleLine className="text-2xl" />
        Log Out
      </button>
    </div>

    <div className="mt-10 w-full  bg-gradient-to-r from-slate-700 to-teal-500">
      <div className="mx-auto grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-2 w-full items-center px-2">
        <div className="flex items-center justify-center sm:justify-center px-5 space-x-5 mb-2">
          <img src={logo} className="h-14 w-16 rounded " />
          <div className="text-2xl font-bold text-center text-white">QuickBuy</div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2">
          <select
            className="cursor-pointer bg-gray-100 max-h-60 overflow-auto rounded p-2 w-full focus:outline-none border-2 border-black"
            onChange={handleCategoryChange}
            value={selected}
          >
            <option value="/">Home</option>
            <option value="/Sports">Sports</option>
            <option value="/Sunglasses">Sunglasses</option>
            <option value="/Beauty_Products">Beauty Products</option>
            <option value="/Clothes">Clothes</option>
            <option value="/Shoes">Shoes</option>
            <option value="/Bags">Bags</option>
            <option value="/Electronic_Items">Electronic Items</option>
            <option value="/Biscuits">Biscuits</option>
            <option value="/Cold_Drinks">Cold Drinks</option>
            <option value="/Snacks">Snacks</option>
            <option value="/Facewash">Facewash</option>
            <option value="/Kitchen_Accessories">Kitchen Accessories</option>
          </select>
          <div className="relative flex items-center w-full md:w-auto gap-2">
            <input
              type="text"
              placeholder="Search Here"
              className="w-full p-2 border-2 border-black rounded focus:outline-none"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {suggestions.length > 0 && (
              <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((product) => (
                  <li
                    key={product.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    {product.name}
                  </li>
                ))}
              </ul>
            )}
            <div className="cursor-pointer bg-emerald-400 text-white font-semibold p-2 rounded hover:scale-105 hover:bg-emerald-500 transition">
              <FiSearch />
            </div>
          </div>
        </div>
      </div>
      
        <div className="grid grid-cols-3 gap-4 py-3 text-white px-2">
          <div
            className="flex items-center justify-center cursor-pointer font-semibold bg-teal-600 px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-transform"
            onClick={() => handleButtonClick('/')}
          >
            <span>Home</span>
          </div>

          <div
            className="flex items-center justify-center gap-2 cursor-pointer font-semibold bg-teal-600 px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-transform"
            onClick={() => handleButtonClick('/WishList')}
          >
            <span>Wishlist</span>
            <span className="flex items-center gap-1">
              <span className="mt-1">
                <FaRegHeart />
              </span>
              <span className="underline">{wishList}</span>
            </span>
          </div>

          <div
            className="flex items-center justify-center gap-2 cursor-pointer font-semibold bg-teal-600 px-4 py-2 rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-transform"
            onClick={() => handleButtonClick('/TotalPrice')}
          >
            <span className="text-sm md:text-lg">Add to Cart</span>
            <span className="flex items-center gap-1">
              <BsCart2 />
              <span className="underline">{cart}</span>
            </span>
          </div>
        </div>

    </div>
    </div>
  )
}
