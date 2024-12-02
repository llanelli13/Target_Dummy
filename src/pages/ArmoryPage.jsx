import React, { useState } from "react";
import GunCard from "../components/GunCard"; 
import GunDetails from "../components/GunDetails"; 
import SearchBar from "../components/SearchBar"

const ArmoryPage = () => {
  const [selectedGun, setSelectedGun] = useState(null); 

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
    {
      name: "Glock",
      image: "/Glock.png",
      description: "Un pistolet semi-automatique.",
      caliber: "9mm",
      weight: "0.6",
      speed: "350",
    },
    {
      name: "Glock",
      image: "/Glock.png",
      description: "Un pistolet semi-automatique.",
      caliber: "9mm",
      weight: "0.6",
      speed: "350",
    },
    {
      name: "Glock",
      image: "/Glock.png",
      description: "Un pistolet semi-automatique.",
      caliber: "9mm",
      weight: "0.6",
      speed: "350",
    }
  ];

  const handleGunClick = (gun) => {
    setSelectedGun(gun); 
  };

  const handleCloseDetails = () => {
    setSelectedGun(null);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Search bar alignée à gauche */}
      <div className="w-full">
        <SearchBar />
      </div>

      {/* Grille des armes */}
      <div className="flex flex-wrap justify-center gap-12">
        {guns.map((gun, index) => (
          <div key={index} className="relative w-60 h-80">
            <GunCard gun={gun} onClick={() => handleGunClick(gun)} />
          </div>
        ))}
      </div>

      {/* Détails de l'arme */}
      {selectedGun && <GunDetails gun={selectedGun} onClose={handleCloseDetails} />}
    </div>
  );
};

export default ArmoryPage;
