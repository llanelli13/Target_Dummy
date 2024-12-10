import { useTranslation } from 'react-i18next';

const SearchBar = ({ filterType, onTypeChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center space-x-2 bg-gray-700 p-2 rounded-full w-1/2">

      {/* Liste déroulante pour filtrer par type */}
      <select
        value={filterType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="bg-gray-600 text-white rounded-full px-2 py-2 focus:outline-none"
      >
        <option value="">{t("type_filter")}</option>
        <option value="Fusil d'assaut">{t('assault_rifle')}</option>
        <option value="Arme de poing">{t('pistol')}</option>
        <option value="Sniper">{t('sniper')}</option>
      </select>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder={t('search_bar')}
        className="w-full bg-transparent text-white placeholder-white focus:outline-none rounded-full"
      />

      {/* Bouton de recherche */}
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


// import React from "react";

// const SearchBar = ({ filterType, onTypeChange, searchQuery, onSearchChange }) => {
//   return (
//     <div className="flex items-center space-x-4">
//       {/* Filtre par type */}
//       <select
//         className="bg-gray-800 text-white rounded-lg px-4 py-2"
//         value={filterType}
//         onChange={(e) => onTypeChange(e.target.value)}
//       >
//         <option value="">Filtre</option>
//         <option value="Fusil d'assaut">Fusil d'assaut</option>
//         <option value="Arme de poing">Arme de poing</option>
//         <option value="Sniper">Sniper</option>
//       </select>

//       {/* Barre de recherche */}
//       <input
//         type="text"
//         placeholder="Une arme en particulier... ?"
//         className="bg-gray-800 text-white rounded-lg px-4 py-2 w-1/2"
//         value={searchQuery}
//         onChange={(e) => onSearchChange(e.target.value)}
//       />
//     </div>
//   );
// };

// export default SearchBar;
