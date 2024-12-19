import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Category({updateAddProducts}) {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const handleButtonClick = (path) => {
    navigate(path);
  };
  return (
    <div className='mt-8 w-full text-center md:block hidden'>   
       <div className='flex flex-col gap-4'>
            <div className='py-4 text-2xl font-bold font-sans'>Category</div>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/')}>Home</button> 
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Sports')}>Sports</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-xs lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Sunglasses')}>Sunglasses</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Beauty_Products')}>Beauty Products</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Clothes')}>Clothes</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Shoes')}>Shoes</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Bags')}>Bags</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Electronic_Items')}>Electronic Items</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Biscuits')}>Biscuits</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Cold_Drinks')}>Cold Drinks</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Snacks')}>Snacks</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full xxs:text-sm lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Facewash')}>Facewash</button>
            <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-semibold py-1 px-4 rounded-full xxs:text-xs lg:text-lg transition duration-300" onClick={() => handleButtonClick('/Kitchen_Accessories')}>Kitchen Items</button>
            {
              (Number(userId) === 86) ?
              <><button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 hover:font-bold font-semibold py-1 px-4 rounded-full text-sm transition duration-300" onClick={() => handleButtonClick('/AdminDashboard')}>Admin Dashboard</button>
              <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-semibold py-1 px-4 rounded-full xxs:text-xs lg:text-lg transition duration-300" onClick={() => updateAddProducts(true)}>Add Products</button></>
              :
              null
            }
       </div>
    </div>
  )
}
