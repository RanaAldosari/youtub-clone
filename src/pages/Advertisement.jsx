import React, { useState } from 'react';

function Advertisement() {
  const [showAd, setShowAd] = useState(true);
  const linkedin = "https://www.linkedin.com/in/rana-aldosari-08b84a2a7/";

  if (!showAd) return null;

  return (
    <div className="relative  mx-auto my-4 shadow-lg rounded overflow-hidden hover:shadow-xl transition-shadow duration-300">

<button onClick={() => setShowAd(false)} className="absolute top-1 right-1 text-white bg-black bg-opacity-60 rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-opacity-80 transition">
       X
      </button>

      <a href={linkedin} target="_blank" rel="noopener noreferrer">
        <img
          className="w-full object-cover"
          src="/WhatsApp Image 2025-06-03 at 9.51.09 PM.jpeg"
        />
      </a>
    </div>
  );
}

export default Advertisement;
