import Header from './Header';
import ShowProducts from './ShowProducts';

export default function SportsLayout({wishList,updateWishList,cart,updateCart,onAddToWishlist,wishListarr,onAddToCart,addCartToarr,setShowResetPassword,setFormSubmitted,updateAddProducts}) {
  return (
    <>
      <Header wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} setShowResetPassword={setShowResetPassword} setFormSubmitted={setFormSubmitted}/>
      <ShowProducts wishList={wishList} updateWishList={updateWishList} cart={cart} updateCart={updateCart} updateAddProducts={updateAddProducts}/>
    </>
  );
}