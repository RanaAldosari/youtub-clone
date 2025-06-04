import React from 'react';

function Sidebar({ isVisible, onClose }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-48 bg-black/90 text-white p-4 z-50 transform transition-transform duration-300 ${
        isVisible ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-end mb-4">
        <button
          onClick={onClose}
          className="text-white text-2xl focus:outline-none hover:text-red-400"
        >
          &times;
        </button>
      </div>
{[
        { icon: '/home.png', label: 'Home' },
        { icon: '/game_icon.png', label: 'Gaming' },
        { icon: '/blogs.png', label: 'Blogs' },
        { icon: '/sports.png', label: 'Sports' },
        { icon: '/music.png', label: 'Music' },
        { icon: '/tech.png', label: 'Technology' },
        { icon: '/news.png', label: 'News' },
      ].map(({ icon, label }) => (
        <div
          key={label}
          className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
        >
          <img src={icon} alt={label} className="w-6 h-6" />
          <p className="text-sm">{label}</p>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
