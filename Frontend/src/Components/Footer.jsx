import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 my-2">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p>Your go-to destination for the best products. We offer a wide range of items to meet all your needs.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul>
              <li>Email: QuickBuy@gmail.com</li>
              <li>Phone: +1 234 567 890</li>
              <li>Address: 123 abc Street, City, Country</li>
            </ul>
          </div>
        <div>  
          <h3 className="text-lg font-semibold py-1">Follow Us</h3>
          <div className="flex space-x-4 py-2 justify-center">
              <a href="https://www.facebook.com/" className="hover:text-yellow-400"  target="_blank"><FaFacebookF /></a>
              <a href="https://twitter.com/" className="hover:text-yellow-400"  target="_blank"><FaTwitter /></a>
              <a href="https://www.instagram.com/" className="hover:text-yellow-400"  target="_blank"><FaInstagram /></a>
              <a href="https://www.linkedin.com/" className="hover:text-yellow-400"  target="_blank"><FaLinkedinIn /></a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 YourWebsite. All Rights Reserved.</p>
        </div>
      </div>
      </div>
    </footer>
  );
}

export default Footer;
