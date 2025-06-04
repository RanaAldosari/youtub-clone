import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
function Navbar({ onMenuClick }) {
const navigate=useNavigate()
const searchbtn=()=>{
   Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Need To Login!",
      });
navigate("/sign")
}

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <img
          src="/menu.png"
          alt="menu"
          className="w-4 h-5 cursor-pointer"
          onClick={onMenuClick}
        />
        <img
          src="/youtube-icon-illustration-youtube-app-logo-social-media-icon_561158-3674-removebg-preview.png"
          alt="YouTube logo"
          className="h-8"
        />
      </div>

      <div className="relative flex-1 max-w-xl mx-4">
        <input onClick={searchbtn}
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    
        />
<img src="/search.png" alt="search" className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"/>
      </div>

      <div className="flex items-center space-x-4">
        <img src="/upload.png" alt="upload" className="w-6 h-6 cursor-pointer" />
        <img src="/more.png" alt="more" className="w-6 h-6 cursor-pointer" />
        <img src="/notification.png" alt="notification" className="w-6 h-6 cursor-pointer" />
        <img src="/user_profile.jpg" alt="user" className="w-8 h-8 rounded-full cursor-pointer" />
      </div>
    </nav>
  );
}

export default Navbar;
