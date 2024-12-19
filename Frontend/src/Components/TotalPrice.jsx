import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function TotalPrice({wishList,updateWishList,cart,updateCart}) {
  const userId = localStorage.getItem('userId');
  const [cartarris, setCartarris] = useState([]);
  const [totalAmount, updateTotalAmount] = useState(0.00);
  const [quantities, setQuantities] = useState({});
  useEffect(() => {
    const total = cartarris.reduce((acc, item, index) => {
      const quantity = quantities[index] !== undefined ? quantities[index] : 1;
      const itemPrice = parseFloat(item.price.replace('$', ''));
      return acc + itemPrice * quantity;
    }, 0);
    updateTotalAmount(total.toFixed(2));
  }, [quantities,cartarris ]);
  
  
  
  useEffect(() => { 
    if (userId) {
      console.log("Sending request to fetch cart");
      axios.get(`http://localhost:3002/getCart/${userId}`)
        .then(response => {
          console.log("Received cart data:", response.data);
          setCartarris(prevList => {
            const newItems = response.data.filter(item => !prevList.some(prevItem => prevItem.id === item.id));
            return [...prevList, ...newItems];
          });
        })
        .catch(error => {
          console.error('Error fetching Cart data:', error);
        });
    }
  }, []);
  
  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity == 0) {
      newQuantity = 0;
    }
    setQuantities({
      ...quantities,
      [index]: newQuantity,
    });
  };

  const handleDelete = async (name) => {
    const itemName = name; 
    if (!userId) {
        toast.error("User not logged in");
        return;
    }
    try {
        const response = await axios.post('http://localhost:3002/api/deleteFromCart', {
            userId: userId,  
            itemName: itemName 
        });
        if (response.status === 200) {
          setCartarris(prevList => prevList.filter(item => item.name !== itemName));
          updateCart(cart - 1);
          toast.success("Item Deleted Successfully");
        } else {
            toast.error("Failed to delete item from cart");
        }
    } catch (error) {
        console.error("Error deleting from cart : ", error);
        toast.error("Error deleting item from cart");
    }
  };
  
    const handleWishlist = async (name,price) => {
        let wishlistflag = 0;
        const item = { name, price };
        try {
            const response = await axios.get(`http://localhost:3002/getWishlist/${userId}`);
            console.log("Received wishlist data:", response.data);
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

  
  return (
    <>
      <div className='text-2xl font-bold font-sans text-center md:mt-12 mt-32 mb-4'>
        Total Amount : {totalAmount} $
      </div>
      {cartarris.slice().reverse().map((item, index) => (
        <div key={index} className="flex gap-3 mb-4 w-full justify-center items-center">
          <div className='w-[25%] text-sm md:text-lg text-center'>{item.name}</div>
          <div className='w-[20%] text-sm md:text-lg text-center'>
            {'$'+(parseFloat(item.price.replace('$', '')) * (quantities[index] !== undefined ? quantities[index] : 1)).toFixed(2)}
          </div>
          <input 
            className='w-[20%] text-sm md:text-lg text-center border-2 border-black' 
            type='number' 
            min="1"
            defaultValue={1}
            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
          />
          <div className='flex flex-col w-[20%] gap-1 '>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-1 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"   onClick={() => handleDelete(item.name)}>Delete</button>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-1 px-1 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300" onClick={() => handleWishlist(item.name, item.price)} >Wishlist</button>
          </div>
        </div>
      ))}
    </>
  );
}
