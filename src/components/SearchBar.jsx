// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Une arme en particulier ... ?"
        className="w-full bg-transparent text-white placeholder-white focus:outline-none rounded-full px-4 py-2"
      />
      <button className="bg-teal-500 text-white p-2 rounded-full hover:bg-teal-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 6h7M10 12h7M10 18h7"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
