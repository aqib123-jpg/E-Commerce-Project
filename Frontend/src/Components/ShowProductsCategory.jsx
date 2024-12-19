import React from 'react';
import { products } from './ProductsDetails.jsx';
import Category from './Category'; 

export default function ShowProducts() {
  return (
    <div className='flex'>
      <div className='w-[12%]'>
        <Category />
      </div>

      <div className='w-[88%] bg-slate-200 pr-0'>
        <div className='py-2 text-2xl font-montserrat underline'>Products</div>
      </div>
    </div>
  );
}
