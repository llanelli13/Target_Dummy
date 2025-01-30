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
    <header className="sticky top-0 flex justify-between items-center bg-primaryBrown p-4 rounded-b-2xl z-50">
      <Link
        to="/leaderboard"
        className="flex items-center space-x-2"
        onClick={() => handleButtonClick("Votre tir")}
      >
        <img src="/Logo.png" alt="Logo" className="h-16" />
        <span className="text-black font-bold font-title text-2xl">Target Dummy</span>
      </Link>

      <nav className="flex items-center space-x-4">
        <div className="flex gap-2 bg-primaryPale rounded-3xl p-2">
          <Link
            to="/shot"
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Votre tir"
                ? "bg-primaryBrown text-black font-bold"
                : "bg-transparent text-black"
            } hover:bg-primaryBrown hover:font-bold`}
            onClick={() => handleButtonClick("Votre tir")}
          >
            {t('your_shot')}
          </Link>
          <Link
            to="/armory"
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Nos armes"
                ? "bg-primaryBrown text-black font-bold"
                : "bg-transparent text-black"
            } hover:bg-primaryBrown hover:font-bold`}
            onClick={() => handleButtonClick("Nos armes")}
          >
            {t('armory')}
          </Link>
          <Link
            to="/history"
            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ease-in-out ${
              selectedButton === "Historique"
                ? "bg-primaryBrown text-black font-bold"
                : "bg-transparent text-black"
            } hover:bg-primaryBrown hover:font-bold`}
            onClick={() => handleButtonClick("Historique")}
          >
            {t('history')}
          </Link>
        </div>

        <Link
          to="/profile"
          className={`flex items-center justify-center rounded-full p-1 transition-all duration-300 ease-in-out ${
            selectedButton === "Profil" ? "bg-primaryPale text-black" : "text-white"
          }`}
          onClick={() => handleButtonClick("Profil")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-10 w-10"
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
