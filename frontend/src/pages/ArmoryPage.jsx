// import { useState } from "react";
// import GunCard from "../components/GunCard";
// import GunDetails from "../components/GunDetails";
// import SearchBar from "../components/SearchBar";

// const ArmoryPage = () => {
//   const [selectedGun, setSelectedGun] = useState(null);
//   const [filterType, setFilterType] = useState(""); // État pour le filtre

//   const guns = [
//     {
//       name: "M4A4",
//       image: "/M4A4.png",
//       description: "reliable_assault_rifle",
//       type: "Fusil d'assaut",
//       caliber: "5.56mm",
//       weight: "3.4",
//       speed: "900",
//     },
//     {
//       name: "Glock",
//       image: "/Glock.png",
//       description: "reliable_pistol",
//       type: "Arme de poing",
//       caliber: "9mm",
//       weight: "0.6",
//       speed: "350",
//     },
//     {
//       name: "AWP",
//       image: "/AWP.png",
//       description: "reliable_sniper",
//       type: "Sniper",
//       caliber: "7.62mm",
//       weight: "6.5",
//       speed: "450",
//     },
//   ];

//   const handleGunClick = (gun) => {
//     setSelectedGun(gun);
//   };

//   const handleCloseDetails = () => {
//     setSelectedGun(null);
//   };

//   const handleTypeChange = (type) => {
//     setFilterType(type);
//   };

//   const filteredGuns = filterType
//     ? guns.filter((gun) => gun.type === filterType)
//     : guns;

//   return (
//     <div className="relative">
//       <div
//         className={`p-6 space-y-8 transition-all ${
//           selectedGun ? "blur-sm pointer-events-none" : ""
//         }`}
//       >
//         <div className="w-full">
//           <SearchBar filterType={filterType} onTypeChange={handleTypeChange} />
//         </div>

//         <div className="flex flex-wrap gap-12">
//           {filteredGuns.map((gun, index) => (
//             <div key={index} className="relative w-60 h-80">
//               <GunCard gun={gun} onClick={() => handleGunClick(gun)} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {selectedGun && (
//         <div className="absolute inset-0 flex items-center justify-center z-50">
//           <GunDetails gun={selectedGun} onClose={handleCloseDetails} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArmoryPage;


import { useState, useEffect } from "react";
import GunCard from "../components/GunCard";
import GunDetails from "../components/GunDetails";
import SearchBar from "../components/SearchBar";
import { getWeapons } from "../api/weaponAPI";

const ArmoryPage = () => {
  const [guns, setGuns] = useState([]);
  const [selectedGun, setSelectedGun] = useState(null);
  const [filterType, setFilterType] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchGuns = async () => {
      try {
        const data = await getWeapons(); 
        setGuns(data);
      } catch (err) {
        setError("Erreur lors du chargement des armes :" + err);
      } finally {
        setLoading(false); 
      }
    };

    fetchGuns();
  }, []);

  const handleGunClick = (gun) => {
    setSelectedGun(gun);
  };

  const handleCloseDetails = () => {
    setSelectedGun(null);
  };

  const handleTypeChange = (type) => {
    setFilterType(type);
  };

  const filteredGuns = filterType
    ? guns.filter((gun) => gun.weapon_type === filterType)
    : guns;

  if (loading) return <p>Chargement des armes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="relative">
      <div
        className={`p-6 space-y-8 transition-all ${
          selectedGun ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="w-full">
          <SearchBar filterType={filterType} onTypeChange={handleTypeChange} />
        </div>

        <div className="flex flex-wrap gap-12">
          {filteredGuns.map((gun) => (
            <div key={gun._id} className="relative w-60 h-80">
              <GunCard gun={gun} onClick={() => handleGunClick(gun)} />
            </div>
          ))}
        </div>
      </div>

      {selectedGun && (
        <div className="absolute inset-0 flex items-center justify-center z-50">
          <GunDetails gun={selectedGun} onClose={handleCloseDetails} />
        </div>
      )}
    </div>
  );
};

export default ArmoryPage;
