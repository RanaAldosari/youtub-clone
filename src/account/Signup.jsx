import React, { useState } from 'react';
import axios from 'axios';
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { FaApple } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
function Signup() {
  const apiUrl = "https://68219a91259dad2655afc3cc.mockapi.io/api/users/user";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate()
  const handleSignup = async () => {
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All fields are required!",
      });
      return;
    }

    try {
      await axios.post(apiUrl, { username, password });
      Swal.fire({
        title: "Account created successfully!",
  icon: "success",
  draggable: true
      });
 localStorage.setItem("username_key",username)     
      setUsername("");
      setPassword("");
 navigate('/home')     
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "There was an error.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 px-4 min-h-screen">
      <div className="bg-white lg:mt-10 shadow-sm rounded-md p-6 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/youtub-logo.png" alt="Logo" className="w-32" />
        </div>
<h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>
 <div className="flex flex-col gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            Sign up with Google
          </button>
          <button className="flex items-center justify-center gap-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition">
            <FaApple />
            Sign up with Apple
          </button>
          <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            <FaFacebook />
            Sign up with Facebook
          </button>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your username"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
