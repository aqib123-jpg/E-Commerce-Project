import React from 'react';
import { useState, useEffect } from 'react';  
import axios from 'axios'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WishList({wishList,updateWishList,cart,updateCart}) {
  const [wishListarris, setWishListarris] = useState([]);
  const userId = localStorage.getItem('userId');
  useEffect(() => { 
    if (userId) {
      console.log("Sending request to fetch wishlist");
      axios.get(`http://localhost:3002/getWishlist/${userId}`)
        .then(response => {
          console.log("Received wishlist data:", response.data);
          setWishListarris(prevList => {
            const newItems = response.data.filter(item => !prevList.some(prevItem => prevItem.id === item.id));
            return [...prevList, ...newItems];
          });
        })
        .catch(error => {
          console.error('Error fetching wishlist data:', error);
        });
    }
  }, []);
  
  const handleAddToCart = async (name, price) => {
    let flag = 0;
    const item = { name, price };
    try {
      const response = await axios.get(`http://localhost:3002/getCart/${userId}`);
      console.log("Received cart data:", response.data);
      const itemExists = response.data.some(cartItem => cartItem.name === item.name);
      if (itemExists) {
        flag = 1;  
        console.log("Item already exists in cart. Flag set to:", flag);
      } else {
        console.log("Item does not exist in cart. Flag remains:", flag);
      }
    } catch (error) {
        console.error('Error fetching Cart data:', error);
    }
    if (flag === 1) {
      toast.error("Item is already in the Cart!");
    } else {
        try {
          if (!userId) {
            toast.error("User not logged in");
            return;
          }
    const response = await axios.post('http://localhost:3002/api/addToCart', {
      userId: userId,
      cartData: item.name,
      cartPrice: item.price
    });
    if (response.status === 200) {
      updateCart(cart + 1);  
      toast.success("Item Added Successfully");
    } else {
      toast.error("Failed to add item to Cart");
    }
    } catch (error) {
        console.error("Error adding to Cart:", error);
        toast.error("Error adding item to Cart");
      }
  }
    
  };
  

  
  const handleDelete = async (name) => {
    const itemName = name; 
    if (!userId) {
        toast.error("User not logged in");
        return;
    }
  
    try {
        const response = await axios.post('http://localhost:3002/api/deleteFromWishlist', {
            userId: userId,  
            itemName: itemName 
        });
  
        if (response.status === 200) {
            setWishListarris(prevList => prevList.filter(item => item.name !== itemName));
            updateWishList(wishList - 1);
            toast.success("Item Deleted Successfully");
        } else {
            toast.error("Failed to delete item from wishlist");
        }
    } catch (error) {
        console.error("Error deleting from wishlist:", error);
        toast.error("Error deleting item from wishlist");
    }
  };
  

  return (
    <>
    <div className='text-2xl font-bold font-sans text-center md:mt-12 mt-32 mb-4'>WishList</div>
    {wishListarris.slice().reverse().map((item, index) => (
      <div key={index} className="flex gap-3 mb-4 w-full justify-center items-center">
        <div className='w-[25%] text-sm md:text-lg text-center'>{item.name}</div>
        <div className='w-[20%] text-sm md:text-lg text-center'>{item.price}</div>
        <button 
          className="w-[20%] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-1 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"  
          onClick={() => handleDelete(item.name)}
          >
          Delete
        </button>
        <button 
          className="w-[20%] bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-1 px-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" 
          onClick={() => handleAddToCart(item.name, item.price)}
          >
          Cart
        </button>
      </div>
    ))}
  </>
  )
};