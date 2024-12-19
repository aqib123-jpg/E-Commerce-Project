import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function PhoneCategory({showOptions,updateOption,updateAddProducts}) {
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
    updateOption(!showOptions);
  };
  return (
    <div className='bg-gradient-to-r from-slate-700 to-teal-500 py-2'>
        <h1 className="mx-4 text-center text-2xl font-bold font-sans text-white">Select Category</h1>
        <div className="grid grid-cols-1 gap-4 mx-4 mt-8 mb-4 text-center">
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/')}>Home</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Sports')}>Sports</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Sunglasses')}>Sunglasses</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Beauty_Products')}>Beauty Products</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Clothes')}>Clothes</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Shoes')}>Shoes</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Bags')}>Bags</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Electronic_Items')}>Electronic Items</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Biscuits')}>Biscuits</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Cold_Drinks')}>Cold Drinks</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Snacks')}>Snacks</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Facewash')}>Facewash</button>
            <button className='bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full w-full' onClick={() => handleButtonClick('/Kitchen_Accessories')}>Kitchen Accessories</button>
            {
              (Number(localStorage.getItem('userId')) === 86) ?
              <><button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full" onClick={() => handleButtonClick('/AdminDashboard')}>Admin Dashboard</button>
              <button className="bg-teal-600 hover:bg-white text-white hover:text-teal-600 font-bold py-2 rounded-full" onClick={() => updateAddProducts(true)}>Add Products</button></>
              :
              null
            }
        </div>
    </div>
  )
}
