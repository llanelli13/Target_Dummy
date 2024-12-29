import { useState } from "react";
import EditableField from "../components/EditableField";
import ProfileStats from "../components/ProfileStats";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { t, i18n } = useTranslation("profile");
  const [language, setLanguage] = useState(i18n.language || "en"); // Langue active

  const toggleLanguage = () => {
    const newLang = language === "fr" ? "en" : "fr";
    setLanguage(newLang);
    i18n.changeLanguage(newLang); // Change la langue
  };

  return (
    <div className="relative">
      <div className="p-10">
        {/* Switch de langue positionné en haut à droite */}
        <div className="absolute top-4 right-4">
          <div
            onClick={toggleLanguage}
            className="flex items-center bg-primaryBrown w-36 h-10 rounded-full cursor-pointer relative"
          >
            {/* Bouton coulissant */}
            <div
              className={`absolute top-1 w-16 h-8 bg-secondaryPale rounded-full shadow-md transition-transform duration-300 ${
                language === "en" ? "translate-x-1" : "translate-x-20"
              }`}
            ></div>
            {/* Label Français */}
            <span
              className={`flex-1 text-center text-sm font-medium font-display ${
                language === "fr" ? "text-white" : "text-gray-500"
              }`}
            >
              {t("français")}
            </span>
            {/* Label English */}
            <span
              className={`flex-1 text-center text-sm font-medium font-sans ${
                language === "en" ? "text-white" : "text-gray-500"
              }`}
            >
              {t("english")}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex">
        {/* Photo de profil et nom */}
        <div className="space-y-6 w-2/3">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <img
                src="https://imgs.search.brave.com/F8b10aLZNcq9daadBDD7wTtw4F-4kLsnwZlhyHet6M8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zMy56/ZXJvY2hhbi5uZXQv/MjQwLzIwLzI3LzM1/MDM4NzAuanBn"
                alt="Profile"
                className="h-32 w-32 rounded-full border-4 border-white"
              />
            </div>
            <span className="text-2xl text-white bg-primaryBrown px-4 py-2 rounded-r-full -ml-2">
              {t("name")}
            </span>
          </div>

          {/* Champs modifiables */}
          <EditableField label={t("name")} value="Prénom NOM" onSave={() => {}} />
          <EditableField label={t("email")} value="prenom.nom@gmail.com" onSave={() => {}} />

          {/* Bouton de suppression */}
          <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
            {t("delete_history")}
          </button>
        </div>
        <ProfileStats />
      </div>
    </div>
  );
};

export default ProfilePage;
