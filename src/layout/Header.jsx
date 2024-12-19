import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation('layout');
  const [selectedButton, setSelectedButton] = useState("Votre tir");

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <header className="sticky top-0 flex justify-between items-center bg-tan p-4 rounded-b-2xl z-1000">
      <Link
        to="/shot"
        className="flex items-center space-x-2"
        onClick={() => handleButtonClick("Votre tir")}
      >
        <img src="/Logo.png" alt="Logo" className="h-14" />
        <span className="text-white font-bold text-lg">Target Dummy</span>
      </Link>

      {/* Navigation */}
      <nav className="flex items-center space-x-4">
        <div className="flex gap-2">
          <Link
            to="/shot"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Votre tir"
                ? "bg-darkGray text-white"
                : "bg-transparent text-black"
            } hover:bg-darkGray hover:text-white`}
            onClick={() => handleButtonClick("Votre tir")}
          >
            {t('your_shot')}
            {/* Votre tir */}
          </Link>
          <Link
            to="/armory"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Nos armes"
                ? "bg-darkGray text-white"
                : "bg-transparent text-black"
            } hover:bg-darkGray hover:text-white`}
            onClick={() => handleButtonClick("Nos armes")}
          >
            {t('armory')}
            {/* Nos armes */}
          </Link>
          <Link
            to="/history"
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Historique"
                ? "bg-darkGray text-white"
                : "bg-transparent text-black"
            } hover:bg-darkGray hover:text-white`}
            onClick={() => handleButtonClick("Historique")}
          >
            {t('history')}
            {/* Historique */}
          </Link>
        </div>

        {/* Bouton de profil cliquable */}
        <Link to="/profile" onClick={() => handleButtonClick("Profil")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
