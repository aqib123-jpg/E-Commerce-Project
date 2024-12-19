import { ToastContainer } from 'react-toastify';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes, useNavigat} from 'react-router-dom';
import { IoIosCloseCircle } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import Header from './Components/Header';
import SportsLayout from './Components/SportsLayout';
import ShowProducts from './Components/ShowProducts';
import Sports from './Components/Sports';
import Bags from './Components/Bags';
import Beauty_Products from './Components/Beauty_Products';
import Biscuits from './Components/Biscuits';
import Clothes from './Components/Clothes';
import Cold_Drinks from './Components/Cold_Drinks';
import Electronic_Items from './Components/Electronic_Items';
import Facewash from './Components/Facewash';
import Home from './Components/Home';
import Kitchen_Accessories from './Components/Kitchen_Accessories';
import Shoes from './Components/Shoes';
import Snacks from './Components/Snacks';
import Sunglasses from './Components/Sunglasses';
import PhoneCategory from './Components/PhoneCategory.jsx';
import AddToCart from './Components/AddToCart..jsx';
import Footer from './Components/Footer.jsx';
import AddDataForm from './AddDataForm.jsx';
import axios from 'axios'; 
import ResetForm from './ResetForm.jsx';
import AdminDashboard from './Components/AdminDashboard.jsx';
import AddProducts from './AddProducts.jsx';

function App() {
  console.log("idhhdhda : ",localStorage.getItem('userId'));
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      console.log("Sending request to fetch wishlist");
      axios.get(`http://localhost:3002/getWishlistLength/${userId}`)
        .then(response => {
          const { wishlist, length } = response.data;
          updateWishList(length);  
        })
        .catch(error => {
          console.error('Error fetching wishlist data:', error);
        });
    }
  }, [userId]);
  const [showOptions, updateOption] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  let [wishList, updateWishList] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const [message, setMessage] = useState(''); 
  const [flag,updateFlag]=useState(false);
  
  const [showAddProducts,updateAddProducts]=useState(false);  

  const [showResetPassword,setShowResetPassword]=useState(false);
  const handleFormSubmit = (submissionMessage) => {
    setMessage(submissionMessage);
    if (submissionMessage === 'Forget Password Request Send Successfully'){
      updateFlag(!flag);
    } else{
      setFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (userId) {
      console.log("Sending request to fetch CART");
      axios.get(`http://localhost:3002/getCartLength/${userId}`)
        .then(response => {
          const { cart, length } = response.data;
          updateCart(length);  
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
        });
    }
  }, [userId]);
  let [cart, updateCart] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!formSubmitted) {
    if(flag){
      return (
        <div className="flex justify-center items-center h-screen bg-slate-200">
          <div className="bg-gradient-to-r from-slate-700 to-teal-500 shadow-md rounded-lg p-6 max-w-md text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Check Your Email</h1>
            <p className="text-white mb-4">
              We've sent you an email. If you don't see it, make sure to check your spam folder.
            </p>
            <button className="w-full cursor-pointer font-semibold bg-teal-600 px-4 py-2 text-white rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-transform" onClick={() => window.open('https://mail.google.com/', '_blank')}> Go to Gmail Inbox</button>
          </div>
        </div>
      );
    }
    return <AddDataForm onFormSubmit={handleFormSubmit} />;
  }
  if (showResetPassword){
    return <ResetForm setShowResetPassword={setShowResetPassword}/>;
  }
  
  if (showAddProducts){
    return <AddProducts updateAddProducts={updateAddProducts}/>;
  }
  

  
  return (
    <Router>
      <ToastContainer />
      <>
          {isMobile && (
            <div className='bg-gradient-to-r from-slate-700 to-teal-500'><div
              className="md:hidden cursor-pointer mt-2 ml-2 inline-flex justify-center items-center py-0 text-3xl text-white"
              onClick={() => updateOption(!showOptions)}
            >
              {showOptions ? <IoIosCloseCircle /> : <AiOutlineMenu />}
            </div></div>
          

        )}
        

        {isMobile && showOptions ? (
          <PhoneCategory showOptions={showOptions} updateOption={updateOption} updateAddProducts={updateAddProducts}/>
        ) : (
          <div>
            <Routes>
                <Route path="/"
                  element={
                    <>
                      <Header wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted}/>
                      <ShowProducts wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} updateAddProducts={updateAddProducts}/>
                      
                    </>
                  }
                />
                <Route path="/AddToCart" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}/>
                <Route path="/WishList" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}/>
                <Route path="/TotalPrice" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}/>
                <Route path="/Sports" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/> }>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>}/>
                </Route>
                <Route path="/Bags" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}  setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>}/>
                </Route>
                <Route path="/Beauty_Products" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Biscuits" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Clothes" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}  setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Cold_Drinks" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Electronic_Items" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>}/>
                </Route>
                <Route path="/Facewash" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Kitchen_Accessories" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Snacks" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}  setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>}/>
                </Route>
                <Route path="/Sunglasses" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
                <Route path="/Shoes" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}  setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                  <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart}/>}/>
                </Route>
                <Route path="/AdminDashboard" element={<SportsLayout wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted} updateAddProducts={updateAddProducts}/>}>
                    <Route path="AddToCart" element={<AddToCart wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} />}/>
                </Route>
              </Routes>
          </div>
        )}
        <Footer />
      </>
    </Router>
  );
}
export default App;