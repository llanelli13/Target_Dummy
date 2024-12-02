// src/pages/ArmoryPage.jsx
import React, { useState } from "react";
import GunCard from "../components/GunCard"; // On suppose que tu as un GunCard
import GunDetails from "../components/GunDetails"; // Importation du composant de détails
import SearchBar from "../components/SearchBar"

const ArmoryPage = () => {
  const [selectedGun, setSelectedGun] = useState(null); // État pour l'arme sélectionnée

  // Exemple d'arme, tu peux remplacer cela par des données dynamiques
  const guns = [
    {
      name: "M4A4",
      image: "/M4A4.png",
      description: "Un fusil d'assaut fiable.",
      caliber: "5.56mm",
      weight: "3.4",
      speed: "900",
    },
    {
      name: "Glock",
      image: "/Glock.png",
      description: "Un pistolet semi-automatique.",
      caliber: "9mm",
      weight: "0.6",
      speed: "350",
    },
    // Ajouter d'autres armes ici...
  ];

  const handleGunClick = (gun) => {
    setSelectedGun(gun); // Sélectionner l'arme et afficher les détails
  };

  const handleCloseDetails = () => {
    setSelectedGun(null); // Fermer les détails de l'arme
  };

  return (
    <div className="p-6">
      <SearchBar />
      <div className="flex flex-wrap justify-center gap-6 m-6">
        {guns.map((gun, index) => (
          <div key={index} className="relative w-60 h-80">
            <GunCard gun={gun} onClick={() => handleGunClick(gun)} />
          </div>
        ))}
      </div>

      {/* Affichage des détails de l'arme sélectionnée */}
      {selectedGun && <GunDetails gun={selectedGun} onClose={handleCloseDetails} />}
    </div>
  );
};

export default ArmoryPage;
