import React from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
  
export default function AddToCart({wishList,updateWishList,cart,updateCart}) {
    const Location = useLocation();
    const userId = localStorage.getItem('userId');
    const { name, price, image } = Location.state || {};
    const handleAddToCart = async () => {
        let flag = 0;
        const item = { name, price };
        try {
            const response = await axios.get(`http://localhost:3002/getCart/${userId}`);
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
    
    const handleWishlist = async () => {
        let wishlistflag = 0;
        const item = { name, price };
        try {
            const response = await axios.get(`http://localhost:3002/getWishlist/${userId}`);
            console.log("Received cart data:", response.data);
            const itemExists = response.data.some(wishlistItem => wishlistItem.name === item.name);
            if (itemExists) {
                wishlistflag = 1;  
                console.log("Item already exists in cart. Flag set to:", wishlistflag);
            } else {
                console.log("Item does not exist in cart. Flag remains:", wishlistflag);
            }
    
        } catch (error) {
            console.error('Error fetching Cart data:', error);
        }
    
        if (wishlistflag === 1) {
            toast.error("Item is already in Wishlist!");
        } else {
            try {
                if (!userId) {
                    toast.error("User not logged in");
                    return;
                }
    
                const response = await axios.post('http://localhost:3002/api/addToWishlist', {
                    userId: userId,
                    wishlistData: item.name,
                    wishlistPrice: item.price
                });
    
                if (response.status === 200) {
                    // onAddToCart(item);  
                    updateWishList(wishList + 1);  
                    toast.success("Item Added Successfully");
                } else {
                    toast.error("Failed to add item to Cart");
                }
            } catch (error) {
                console.error("Error adding to Wishlist:", error);
                toast.error("Error adding item to Wishlist");
            }
        }
    };
  
  
  const location=useLocation().pathname;
    const category = location.split('/AddToCart')[0].split('/').pop();
    return (
      <>
      <div className='text-2xl font-montserrat underline text-center md:mt-12 mt-28'>Product Details</div>
      <div className="flex justify-center items-center mt-8 mb-4 mx-4 shadow-lg">
              <div className="border rounded-lg p-4 shadow-2xl flex flex-col h-full justify-center bg-white max-w-xs text-center">
                  <img src={image} className="w-auto md:h-56 h-72 object-cover rounded-t-lg mb-4 hover:scale-105 "/>
                  <div className="flex flex-col flex-grow">
                      <div className="text-xl font-semibold mb-2">{name}</div>
                      <span>{category}</span>
                  </div>
                  <div className="text-lg text-gray-500 mb-2">{price}</div>
                  <p>{name} , Shop Now for Unmatched Variety and Exceptional Value Today</p>
                  <div className="flex mx-auto justify-between w-full mt-4">
                      <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300' onClick={handleAddToCart}>Add To Cart</button>
                      <button className='bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300' onClick={handleWishlist}>Add To Wishlist</button>
                  </div>
              </div>
          </div>
      </>
    )
  }
