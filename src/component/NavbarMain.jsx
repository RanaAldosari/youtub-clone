import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from '../pages/Sidebar';
function NavbarMain() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="relative">
{/* navbar */}
      <Navbar onMenuClick={() => setShowSidebar(true)} />
{/* sidebar */}
      <Sidebar isVisible={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
}

export default NavbarMain;
