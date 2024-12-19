import Category from './Category'; 
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Home from './Home.jsx';
import Sports from './Sports.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bags from './Bags';
import Beauty_Products from './Beauty_Products';
import Biscuits from './Biscuits';
import Clothes from './Clothes';
import Cold_Drinks from './Cold_Drinks';
import Electronic_Items from './Electronic_Items';
import Facewash from './Facewash';
import Kitchen_Accessories from './Kitchen_Accessories';
import Shoes from './Shoes';
import Snacks from './Snacks';
import Sunglasses from './Sunglasses';
import AddToCart from './AddToCart..jsx';
import WishList from './WishList.jsx';
import TotalPrice from './TotalPrice.jsx';
import AdminDashboard from './AdminDashboard.jsx';

export default function ShowProducts({wishList,updateWishList,cart,updateCart,updateAddProducts}) {
  const location = useLocation();
  const renderComponent = () => {
    switch (location.pathname) {
      case '/Sports':
        return <Sports/>;
      case '/Bags':
        return <Bags/>;
      case '/Beauty_Products':
        return <Beauty_Products/>;
      case '/Biscuits':
        return <Biscuits/>;
      case '/Clothes':
        return <Clothes/>;
      case '/Cold_Drinks':
        return <Cold_Drinks/>;
      case '/Electronic_Items':
        return <Electronic_Items/>;
      case '/Facewash':
        return <Facewash/>;
      case '/Kitchen_Accessories':
        return <Kitchen_Accessories/>;
      case '/Snacks':
        return <Snacks/>;
      case '/Sunglasses':
        return <Sunglasses/>;    
      case '/WishList':
        return <WishList wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>;
      case '/TotalPrice':
        return <TotalPrice wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>; 
      case '/Shoes':
        return <Shoes/>;
      case '/AdminDashboard': 
        return <AdminDashboard/>
      default:
        if (location.pathname.endsWith('/AddToCart')){
          return <AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>
        }
        return <Home/>;
    }  
  };
  return (
    <div className='flex gap-6 bg-slate-200'>
      <div className='w-[12%] ml-12 md:block hidden'>
        <Category updateAddProducts={updateAddProducts}/>
      </div>
      <div className='w-[100%] lg:w-[88%] md:w-[88%] xl:w-[88%] 2xl:w-[88%] '>
        {renderComponent()}
      </div>
    </div>
  );
}