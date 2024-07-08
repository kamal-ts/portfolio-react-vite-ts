// src/components/Sidebar.js

import { useState } from 'react';

const Sidebar2 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Button to toggle sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-50"
      >
        {isOpen ? 'Close' : 'Open'}
      </button>
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <nav className="mt-20">
          <ul>
            <li className="p-4 hover:bg-gray-700">Home</li>
            <li className="p-4 hover:bg-gray-700">About</li>
            <li className="p-4 hover:bg-gray-700">Services</li>
            <li className="p-4 hover:bg-gray-700">Contact</li>
          </ul>
        </nav>
      </div>
      
      {/* Content area */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl">Content Area</h1>
        <p>This is the main content area.</p>
      </div>
    </div>
  );
};

export default Sidebar2;
