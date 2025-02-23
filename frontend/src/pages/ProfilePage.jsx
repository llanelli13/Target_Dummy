// import { useState } from "react";
// import EditableField from "../components/EditableField";
// import ProfileStats from "../components/ProfileStats";
// import { useTranslation } from "react-i18next";
// import { useMode } from "../context/ModeContext";

// const ProfilePage = () => {
//   const { t, i18n } = useTranslation("profile");
//   const { mode, toggleMode } = useMode();
//   const [language, setLanguage] = useState(i18n.language || "en"); // Langue active

//   const toggleLanguage = () => {
//     const newLang = language === "fr" ? "en" : "fr";
//     setLanguage(newLang);
//     i18n.changeLanguage(newLang); // Change la langue
//   };

//   const [modeState, setModeState] = useState(mode === "Military" ? "Military" : "Civil"); // État du mode

//   const toggleModeSlider = () => {
//     const newMode = modeState === "Military" ? "Civil" : "Military";
//     setModeState(newMode);
//     toggleMode(); // Appelle la fonction pour changer le mode dans le contexte
//   };

//   return (
//     <div className="relative">
//       <div className="p-10">
//         {/* Switch de langue positionné en haut à droite */}
//         <div className="absolute top-4 right-0 flex items-center space-x-4">
//           {/* ToggleMode Slider */}
//           <div
//             onClick={toggleModeSlider}
//             className="flex items-center bg-primaryBrown w-36 h-10 rounded-full cursor-pointer relative"
//           >
//             <div
//               className={`absolute top-1 w-16 h-8 bg-secondaryPale rounded-full shadow-md transition-transform duration-300 ${
//                 modeState === "Civil" ? "translate-x-1" : "translate-x-20"
//               }`}
//             ></div>
//             {/* Label Civil */}
//             <span
//               className={`flex-1 text-center text-sm font-medium font-display ${
//                 modeState === "Military" ? "text-white" : "text-gray-500"
//               }`}
//             >
//               {t("military")}
//             </span>
//             {/* Label Military */}
//             <span
//               className={`flex-1 text-center text-sm font-medium font-display ${
//                 modeState === "Civil" ? "text-white" : "text-gray-500"
//               }`}
//             >
//               {t("civil")}
//             </span>
//           </div>

//           {/* Switch de langue */}
//           <div
//             onClick={toggleLanguage}
//             className="flex items-center bg-primaryBrown w-36 h-10 rounded-full cursor-pointer relative"
//           >
//             {/* Bouton coulissant */}
//             <div
//               className={`absolute top-1 w-16 h-8 bg-secondaryPale rounded-full shadow-md transition-transform duration-300 ${
//                 language === "en" ? "translate-x-1" : "translate-x-20"
//               }`}
//             ></div>
//             {/* Label Français */}
//             <span
//               className={`flex-1 text-center text-sm font-medium font-display ${
//                 language === "fr" ? "text-white" : "text-gray-500"
//               }`}
//             >
//               {t("français")}
//             </span>
//             {/* Label English */}
//             <span
//               className={`flex-1 text-center text-sm font-medium font-sans ${
//                 language === "en" ? "text-white" : "text-gray-500"
//               }`}
//             >
//               {t("english")}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex">
//         {/* Photo de profil et nom */}
//         <div className="space-y-6 w-2/3">
//           <div className="flex items-center">
//             <div className="flex-shrink-0 relative">
//               <img
//                 src="https://imgs.search.brave.com/F8b10aLZNcq9daadBDD7wTtw4F-4kLsnwZlhyHet6M8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zMy56/ZXJvY2hhbi5uZXQv/MjQwLzIwLzI3LzM1/MDM4NzAuanBn"
//                 alt="Profile"
//                 className="h-32 w-32 rounded-full border-4 border-white"
//               />
//             </div>
//             <span className="text-2xl text-white bg-primaryBrown px-4 py-2 rounded-r-full -ml-2">
//               {t("name")}
//             </span>
//           </div>

//           {/* Champs modifiables */}
//           <EditableField label={t("name")} value="Prénom NOM" onSave={() => {}} />
//           <EditableField label={t("usernmae")} value="Username" onSave={() => {}} />
//           <EditableField label={t("email")} value="prenom.nom@gmail.com" onSave={() => {}} />
//           <EditableField label={t("password")} value="********" onSave={() => {}} />
          
//           {/* Bouton de suppression */}
//           <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
//             {t("delete_history")}
//           </button>
//         </div>

//         <ProfileStats />
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import { useState, useEffect } from "react";
import EditableField from "../components/EditableField";
import ProfileStats from "../components/ProfileStats";
import { useTranslation } from "react-i18next";
import { useMode } from "../context/ModeContext";
import { useSession } from "../context/SessionContext";
import { getUserById, modifyUser } from "../api/userAPI"

const ProfilePage = () => {
  const { t, i18n } = useTranslation("profile");
  const { mode, toggleMode } = useMode();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [modeState, setModeState] = useState(mode === "Military" ? "Military" : "Civil");
  const [userData, setUserData] = useState({
    user_name: "",
    user_firstname: "",
    email: "",
    password: ""
  });
  const { userID } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getUserById(userID);
        setUserData(user);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdate = async (field, value) => {
    try {
      const updatedUser = { ...userData, [field]: value };
      await modifyUser(userID, { [field]: value });
      setUserData(updatedUser);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
    }
  };

  return (
    <div className="relative">
      <div className="p-10">
        <div className="absolute top-4 right-0 flex items-center space-x-4">
          {/* Switch Mode */}
          <div onClick={() => { setModeState(modeState === "Military" ? "Civil" : "Military"); toggleMode(); }} 
               className="flex items-center bg-primaryBrown w-36 h-10 rounded-full cursor-pointer relative">
            <div className={`absolute top-1 w-16 h-8 bg-secondaryPale rounded-full shadow-md transition-transform duration-300 ${modeState === "Civil" ? "translate-x-1" : "translate-x-20"}`}></div>
            <span className={`flex-1 text-center text-sm font-medium ${modeState === "Military" ? "text-white" : "text-gray-500"}`}>{t("military")}</span>
            <span className={`flex-1 text-center text-sm font-medium ${modeState === "Civil" ? "text-white" : "text-gray-500"}`}>{t("civil")}</span>
          </div>
          {/* Switch Langue */}
          <div onClick={() => { const newLang = language === "fr" ? "en" : "fr"; setLanguage(newLang); i18n.changeLanguage(newLang); }} 
               className="flex items-center bg-primaryBrown w-36 h-10 rounded-full cursor-pointer relative">
            <div className={`absolute top-1 w-16 h-8 bg-secondaryPale rounded-full shadow-md transition-transform duration-300 ${language === "en" ? "translate-x-1" : "translate-x-20"}`}></div>
            <span className={`flex-1 text-center text-sm font-medium ${language === "fr" ? "text-white" : "text-gray-500"}`}>{t("français")}</span>
            <span className={`flex-1 text-center text-sm font-medium ${language === "en" ? "text-white" : "text-gray-500"}`}>{t("english")}</span>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Profil */}
        <div className="space-y-6 w-2/3">
          <div className="flex items-center">
            <div className="flex-shrink-0 relative">
              <img src="https://imgs.search.brave.com/F8b10aLZNcq9daadBDD7wTtw4F-4kLsnwZlhyHet6M8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zMy56/ZXJvY2hhbi5uZXQv/MjQwLzIwLzI3LzM1/MDM4NzAuanBn" alt="Profile" 
                   className="h-32 w-32 rounded-full border-4 border-white"/>
            </div>
            <span className="text-2xl text-white bg-primaryBrown px-4 py-2 rounded-r-full -ml-2">
              {userData.user_name} {userData.user_firstname}
            </span>
          </div>

          {/* Champs modifiables */}
          <EditableField label={t("name")} value={userData.user_name || ""} onSave={(val) => handleUpdate("user_name", val)} />
          <EditableField label={t("username")} value={userData.user_firstname || ""} onSave={(val) => handleUpdate("user_firstname", val)} />
          <EditableField label={t("email")} value={userData.email || ""} onSave={(val) => handleUpdate("email", val)} />
          <EditableField label={t("password")} value="********" onSave={(val) => handleUpdate("password", val)} />

          {/* Bouton suppression */}
          {/* <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
            {t("delete_history")}
          </button> */}
        </div>

        {/* <ProfileStats /> */}
      </div>
    </div>
  );
};

export default ProfilePage;
