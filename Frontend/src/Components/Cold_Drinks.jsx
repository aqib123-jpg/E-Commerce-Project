import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { allProductDetails } from './ProductsDetails';
import { toast } from 'react-toastify';
export default function Cold_Drinks() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleButtonClick = (name,price,image) => {
    navigate('AddToCart', {
      state: { name, price, image },
    });
  };

  const fetchProducts = async (table) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/getTableData/${table}`);
      setProducts(response.data); // Store the fetched data in state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProducts('COLDDRINKSPRODUCTS');
  }, []);

  const confirmProductDelete = (id, type, name) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <p className="mb-2 text-lg font-medium">Are you sure you want to delete this product?</p>
          <div className="flex justify-around w-full">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold transition duration-200 hover:bg-red-600"
              onClick={() => handleDeleteProduct(id, type, name, closeToast)}
            >
              Yes
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold transition duration-200 hover:bg-blue-700"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      { autoClose: false }
    );
  };
  
  const handleDeleteProduct = async (id, type, name, closeToast) => {
    try {
      await axios.delete(`http://localhost:3002/api/productDelete/${id}/${type}`);
      setProducts(products.filter((product) => product.ID !== id));
      const index = allProductDetails.findIndex((product) => product.name === name);
      if (index !== -1) allProductDetails.splice(index, 1);
  
      toast.success('Product deleted successfully');
      closeToast(); 
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
    <div className='text-2xl font-bold font-sans text-center md:mt-12 mt-28'>Cold Drinks</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 mt-8 mb-4 text-center">
        {products.slice().reverse().map(product => (
            <div key={product.ID} className="border rounded-lg p-4 shadow-2xl bg-white flex flex-col h-full">
                <img src={product.IMAGE_URL} alt={product.COLDDRINKS_PRODUCTS_NAME} className="w-full md:h-48 h-64 object-cover rounded-t-lg mb-4 hover:scale-105"/>
                <div className="flex flex-col flex-grow">
                    <div className="text-xl font-semibold mb-2">{product.COLDDRINKS_PRODUCTS_NAME}</div>
                </div>
                <div className="text-lg text-gray-500 mb-4">{product.PRICE}</div>
                <button className="bg-teal-600 text-white px-4 py-2 my-1 rounded-full hover:bg-teal-800 mt-auto" onClick={() => handleButtonClick(product.COLDDRINKS_PRODUCTS_NAME,product.PRICE,product.IMAGE_URL)}>Details</button>
                {
                  (Number(localStorage.getItem('userId')) === 86) ?
                  <button className="bg-[#E86C4F] text-white px-4 py-2 rounded-full hover:bg-[#D6452A] mt-auto" onClick={() => confirmProductDelete(product.ID,'COLDDRINKSPRODUCTS',product.COLDDRINKS_PRODUCTS_NAME)}>Delete</button>
                  :
                  null
                }
            </div>
        ))}
    </div>
    </>
  )
}