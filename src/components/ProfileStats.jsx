import { useState } from "react";
import SearchBar from "./SearchBar";
import { useTranslation } from "react-i18next";

const ProfileStats = () => {
  const { t, i18n } = useTranslation("profile");

  return (
    <div className="bg-[#C4B6AB] p-6 rounded-3xl w-3/5">
      {/* Titre avec la police Oswald */}
      <h2 className="text-3xl text-[#2D1E17] mb-6 font-secondary font-bold text-center">
        {t("stats_weapon")}
      </h2>
      
      {/* Barre de recherche */}
      <div className="flex mb-4">
        <SearchBar customDesign="flex items-center space-x-2 bg-secondaryPale p-2 rounded-full w-full" />
      </div>

      {/* Conteneur des stats */}
      <div className="flex-column">
        <div className="mt-6 bg-secondaryPale text-black p-4 rounded-2xl font-secondary">Arme 1</div>
        <div className="mt-6 bg-secondaryPale text-black p-4 rounded-2xl font-secondary">Arme 2</div>
        <div className="mt-6 bg-secondaryPale text-black p-4 rounded-2xl font-secondary">Arme 3</div>
      </div>
    </div>
  );
};

export default ProfileStats;
