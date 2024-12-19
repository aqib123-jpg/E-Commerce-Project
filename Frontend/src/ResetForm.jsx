// import React, { useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { MdLockReset } from 'react-icons/md';
// import axios from 'axios';
// const ResetForm = ({setShowResetPassword}) => {
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
  
//   const handleResetPassword = async () => {
//     if (newPassword !== confirmPassword) {
//       alert("Passwords don't match");
//       return;
//     }
  
//     const userId = localStorage.getItem('userId'); // Assuming 'userId' is the key used in local storage
//     console.log("id which is sending: ", userId);
//     console.log("password which is sending: ", newPassword);
    
//     try {
//       const response = await axios.post('http://localhost:3002/api/resetPassword', {
//         id: userId,
//         password: newPassword,
//       });
  
//       // If request is successful, show toast notification
//       toast.success('Password updated successfully!', {
//         position: toast.POSITION.TOP_RIGHT
//       });
      
//     } catch (error) {
//       alert('Failed to reset password. Please try again.');
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gradient-to-r from-[#d6d3d1] via-[#bae6fd] to-[#fecaca]">
//       <div className="bg-[#4f46e5] rounded-lg border-2 border-dashed border-[#eab308] p-8 shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-4 text-white">Reset Password</h2>
//         <input
//           type="password"
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//           placeholder="Enter new password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
        
//         <input
//           type="password"
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
        
//         <div className="flex justify-between">
//           <button onClick={handleResetPassword}
//             className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600"
//           >
//             Submit
//           </button>
//           <button
//             className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600"
//             onClick={()=>{setShowResetPassword(false)}}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ResetForm;





import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdLockReset } from 'react-icons/md';
import axios from 'axios';

const ResetForm = ({ setShowResetPassword }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      // alert("Passwords don't match");
      toast.success("Reset & Confirm Passwords don't Match");
      return;
    }

    const userId = localStorage.getItem('userId');
    console.log("id which is sending: ", userId);
    console.log("password which is sending: ", newPassword);

    try {
      const response = await axios.post('http://localhost:3002/api/resetPassword', {
        id: userId,
        password: newPassword,
      });

      // Log the response to ensure the request was successful
      console.log("Response received: ", response);

      // If request is successful, show toast notification
      if (response.status === 200) {
        toast.success('Password updated successfully!');
      }
    } catch (error) {
      console.error("Error during reset password: ", error);
      toast.error('Failed to reset password. Please try again.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center  bg-gradient-to-r from-[#d6d3d1] via-[#bae6fd] to-[#fecaca]">
    //   <div className="bg-[#4f46e5] rounded-lg border-2 border-dashed border-[#eab308] p-8 shadow-md w-full max-w-md">
    //     <h2 className="text-2xl font-semibold text-center mb-4 text-white">Reset Password</h2>
    //     <input
    //       type="password"
    //       className="w-full p-2 mb-4 border border-gray-300 rounded"
    //       placeholder="Enter new password"
    //       value={newPassword}
    //       onChange={(e) => setNewPassword(e.target.value)}
    //     />
        
    //     <input
    //       type="password"
    //       className="w-full p-2 mb-4 border border-gray-300 rounded"
    //       placeholder="Confirm new password"
    //       value={confirmPassword}
    //       onChange={(e) => setConfirmPassword(e.target.value)}
    //     />
        
    //     <div className="flex justify-between">
    //       <button onClick={handleResetPassword}
    //         className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600"
    //       >
    //         Submit
    //       </button>
    //       <button
    //         className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600"
    //         onClick={() => { setShowResetPassword(false); }}
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-200">
      <div className="bg-gradient-to-r from-slate-700 to-teal-500 rounded-lg p-8 shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-white">Reset Password</h2>
        <input
          type="password"
          className="w-full p-2 mb-4 border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        
        <input
          type="password"
          className="w-full p-2 mb-4 border-2 border-[#020617] rounded-md focus:outline-none"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        
        <div className="flex justify-between">
          <button onClick={handleResetPassword}
            className="bg-emerald-500 text-white p-2 rounded hover:bg-emerald-600"
          >
            Submit
          </button>
          <button
            className="bg-red-500 text-white p-2 rounded ml-2 hover:bg-red-600"
            onClick={() => { setShowResetPassword(false); }}
          >
            Cancel
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetForm;
