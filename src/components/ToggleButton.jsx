import React from "react";

const ToggleButton = ({ darkMode, toggleDarkMode }) => (
    <div className="absolute top-10 right-10 p-4">
      <label className="relative flex items-center cursor-pointer">
        <span className="mr-4 text-gray-700 font-medium dark:text-white">DARK</span>
        <div className="relative w-14 h-8 bg-gray-600 rounded-full dark:bg-gray-100">
          <input type="checkbox" className="sr-only" checked={darkMode} onChange={toggleDarkMode} />
          <div className={`absolute top-1 left-1 bg-white w-6 h-6 rounded-full shadow transform transition-all duration-500 ease-in-out dark:bg-black ${darkMode ? 'translate-x-6' : ''}`}>
          </div>
        </div>
        <span className="ml-4 text-gray-700 font-medium dark:text-white">LIGHT</span>
      </label>
    </div>
  );
  
export default ToggleButton;