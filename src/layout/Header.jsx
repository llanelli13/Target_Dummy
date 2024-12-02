import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [selectedButton, setSelectedButton] = useState("Votre tir");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <header className="flex justify-between items-center bg-teal-500 p-4 rounded-b-lg">
      <div className="flex items-center space-x-2">
        <img src="/Logo.png" alt="Logo" className="h-14" />
        <span className="text-white font-bold text-lg">Target Dummy</span>
      </div>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
         <div className="flex gap-2"> {/* ou ca  : p-1.5 items-center justify-end border border-black rounded-full bg-gray-400/25 ?*/}
          <Link
            to="/" 
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Votre tir" ? "bg-gray-700 text-white" : "bg-transparent text-black"
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleButtonClick("Votre tir")}
          >
            Votre tir
          </Link>
          <Link
            to="/armory"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Nos armes" ? "bg-gray-700 text-white" : "bg-transparent text-black"
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleButtonClick("Nos armes")}
          >
            Nos armes
          </Link>
          <Link
            to="/history"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Historique" ? "bg-gray-700 text-white" : "bg-transparent text-black"
            } hover:bg-gray-700 hover:text-white`}
            onClick={() => handleButtonClick("Historique")}
          >
            Historique
          </Link>
        </div>

        {/* Bouton de profil */}
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

        </div>
      </nav>
    </header>
  );
};

export default Header;
