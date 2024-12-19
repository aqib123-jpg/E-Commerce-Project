import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]); 
  useEffect(() => {
    fetchUsers(); 
  }, []);
  const fetchUsers = () => {
    axios.get('http://localhost:3002/api/users')
      .then((response) => {
        setUsers(response.data); 
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  const handleDelete = (userEmail) => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col items-center">
          <p className="mb-2 text-lg font-medium">Are you sure you want to delete this user?</p>
          <div className="flex justify-around w-full">
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold transition duration-200 hover:bg-red-600"
              onClick={() => confirmDelete(userEmail, closeToast)}
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
  
  const confirmDelete = (userEmail, closeToast) => {
    axios
      .delete(`http://localhost:3002/api/users/${userEmail}`)
      .then((response) => {
        console.log(response.data.message); 
        fetchUsers(); 
        toast.success('User deleted successfully'); 
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user'); 
      })
      .finally(() => {
        closeToast(); 
      });
  };

  return (
    <div className="p-8 min-h-screen">
      <h1 className='text-2xl font-bold font-sans text-center mt-5 '>Admin Dashboard</h1>
      <div className="overflow-x-auto mt-12">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left font-medium text-gray-700">Name</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left font-medium text-gray-700">Password</th>
              <th className="px-4 py-2 text-center font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-t hover:bg-[#e0e0e0]">
                <td className="xl:px-4 px-2 py-2">{user.NAME}</td>
                <td className="xl:px-4 px-2 py-2">{user.EMAIL}</td>
                <td className="xl:px-4 px-2 py-2">{user.PASSWORD}</td>
                <td className="xl:px-4 px-2 py-2 text-center">
                  <button
                    onClick={() => handleDelete(user.EMAIL)}
                    className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 rounded-full"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
