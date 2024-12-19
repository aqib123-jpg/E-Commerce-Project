import React, { useState } from 'react';
import axios from 'axios';

function AddDataForm({ onFormSubmit }) {
  const [uName, setUName] = useState('');
  const [uPassword, setUPassword] = useState('');
  const [uEmail, setUEmail] = useState('');
  const [action, setAction] = useState('login');
  const [loading, setLoading] = useState(false); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);                            
    try {
      const payload = { uName, uPassword, action };
      if (action === "signup" || action === "forgetPassword") {
        payload.uEmail = uEmail;
      }
      const response = await axios.post('http://localhost:3002/api/addData',payload);
      if (response.status === 200) {
        const userId = response.data.userId; 
        localStorage.setItem('userId', userId);  
        if (action === 'signup') {
          onFormSubmit('Data inserted successfully');
        } else if (action === 'login') {
          onFormSubmit('Login successful');
        } else if (action === 'forgetPassword'){
          onFormSubmit('Forget Password Request Send Successfully');
        }
      }
    } 
    catch (error) {
      if (error.response) 
        {
        if (error.response.data === "Email already exists") {
          alert("Email already exists");
        } else if (error.response.data === "Username already exists") {
          alert("Username already exists");
        } else if((error.response.data === 'Server error') || (error.response.data === 'User not found') || (error.response.data === 'Error in Sending Email') || (error.response.data === 'Password sent to your email')){
          alert(error.response.data);
        } else {
          alert('Invalid credentials');
        }
      } else {
        onFormSubmit('An error occurred');
      }
    } finally {               
      setLoading(false);      
    }                         
  };
  
  return (
    <div className="h-[100vh] flex justify-center items-center bg-slate-200">
      <div className="bg-gradient-to-r from-slate-700 to-teal-500 rounded-lg p-8 w-full max-w-md mx-4">
        <h1 className="text-center text-3xl font-serif text-[#d4d4d8] py-4">Login & Registration</h1>
        <form onSubmit={handleSubmit} method="post" className="flex flex-col">
          <label htmlFor="uName" className="text-lg text-white py-2">Enter User Name:</label>
          <input type="text" id="uName" name="uName" value={uName} onChange={(e) => setUName(e.target.value)} placeholder="Username" className="border-2 border-[#020617] p-2 rounded-md focus:outline-none" required/>
          <label htmlFor="uPassword" className="text-lg text-white py-2">Enter Password:</label>
          <input type="password" id="uPassword" name="uPassword" value={uPassword} onChange={(e) => setUPassword(e.target.value)} className="border-2 border-[#020617] p-2 rounded-md focus:outline-none" placeholder="Password" required={action !== 'forgetPassword'}/>
          {
            (action === "signup") ? 
              <><label htmlFor="uEmail" className="text-lg text-white py-2">Enter Email:</label>
              <input type="email" id="uEmail" name="uEmail" value={uEmail}onChange={(e) => setUEmail(e.target.value)} className="border-2 border-[#020617] p-2 rounded-md focus:outline-none" placeholder="Email" required/></>
            :
              null
          }
          <div className="flex items-center py-4">
            <input
              type="radio"
              id="login"
              name="action"
              value="login"
              className="mr-2 cursor-pointer"
              checked={action === 'login'}
              onChange={() => setAction('login')}
            />
            <label htmlFor="login" className="text-white mr-4 cursor-pointer">Login</label>
            <input
              type="radio"
              id="signup"
              name="action"
              value="signup"
              className="mr-2 cursor-pointer"
              checked={action === 'signup'}
              onChange={() => setAction('signup')}
            />
            <label htmlFor="signup" className="text-white mr-4 cursor-pointer">Sign Up</label>
            <input type="radio" id="forgetPassword" name="action" value="forgetPassword" className="mr-2 cursor-pointer" checked={action === 'forgetPassword'} onChange={() => setAction('forgetPassword')}/>
            <label htmlFor="forgetPassword" className="text-white cursor-pointer">Forget Password</label>
          </div>
          {loading && <p className="text-center">Processing your request...</p>}   
          <div className="flex justify-center">
            <input
              type="submit"
              value="Submit"
              disabled={loading}
              className='w-full cursor-pointer font-semibold bg-teal-600 px-4 py-2 text-white rounded-lg shadow-md hover:bg-teal-700 hover:scale-105 transition-transform'
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDataForm;
