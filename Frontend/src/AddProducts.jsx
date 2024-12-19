import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { allProductDetails } from './Components/ProductsDetails';
export default function AddProducts({updateAddProducts}) {
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState();
  const [imageUrl,setImageUrl]=useState('');  

  const handleAddProduct = async () => {
    if (!productName || !productPrice || !imageUrl) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/addProducts', {
        productCategory,
        productName,
        productPrice: `$${productPrice}`,
        imageUrl,
      });
      allProductDetails.push({
        id: allProductDetails.length + 1, // Generate a unique ID
        name: productName,
        price: productPrice,
        image: imageUrl
      });
      toast.success('Product added successfully');
      setProductCategory('');
      setProductName('');
      setProductPrice('');
      setImageUrl('');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-slate-200">
      <div className="bg-gradient-to-r from-slate-700 to-teal-500 rounded-lg p-8 shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-white">Add Product</h2>
        <input
          type="text"
          className="w-full p-2 mb-4  border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Enter Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        
        <input
          type="number"
          className="w-full p-2 mb-4 border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Enter Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        
        <input
          type="text"
          className="w-full p-2 mb-4 border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Image Url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <div className="flex justify-between">
          <button 
            className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600"
            onClick={handleAddProduct}
          >
            Add
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600"
            onClick={() => { updateAddProducts(false); }}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}
