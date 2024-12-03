import React, { useState } from "react";
import GunCard from "../components/GunCard";
import GunDetails from "../components/GunDetails";
import SearchBar from "../components/SearchBar";

const ArmoryPage = () => {
  const [selectedGun, setSelectedGun] = useState(null);
  const [filterType, setFilterType] = useState(""); // État pour le filtre

  const guns = [
    {
      name: "M4A4",
      image: "/M4A4.png",
      description: "Un fusil d'assaut fiable.",
      type: "Fusil d'assaut",
      caliber: "5.56mm",
      weight: "3.4",
      speed: "900",
    },
    {
      name: "Glock",
      image: "/Glock.png",
      description: "Un pistolet semi-automatique.",
      type: "Arme de poing",
      caliber: "9mm",
      weight: "0.6",
      speed: "350",
    },
    {
      name: "AWP",
      image: "/AWP.png",
      description: "Un fusil de précision mortel.",
      type: "Sniper",
      caliber: "7.62mm",
      weight: "6.5",
      speed: "450",
    },
  ];

  const handleGunClick = (gun) => {
    setSelectedGun(gun);
  };

  const handleCloseDetails = () => {
    setSelectedGun(null);
  };

  const handleTypeChange = (type) => {
    setFilterType(type); // Mise à jour du type d’arme
  };

  // Filtrage des armes en fonction du type sélectionné
  const filteredGuns = filterType
    ? guns.filter((gun) => gun.type === filterType)
    : guns;

  return (
    <div className="relative">
      {/* Conteneur avec flou conditionnel */}
      <div
        className={`p-6 space-y-8 transition-all ${
          selectedGun ? "blur-sm pointer-events-none" : ""
        }`}
      >
        {/* Barre de recherche avec filtre */}
        <div className="w-full">
          <SearchBar filterType={filterType} onTypeChange={handleTypeChange} />
        </div>

        {/* Grille des armes */}
        <div className="flex flex-wrap gap-12">
          {filteredGuns.map((gun, index) => (
            <div key={index} className="relative w-60 h-80">
              <GunCard gun={gun} onClick={() => handleGunClick(gun)} />
            </div>
          ))}
        </div>
      </div>

      {/* Détails de l'arme */}
      {selectedGun && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <GunDetails gun={selectedGun} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default ArmoryPage;
