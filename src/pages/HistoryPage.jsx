import { useState } from "react";
import SearchBar from "../components/SearchBar";
import GunDetails from "../components/GunDetails";
import { useTranslation } from 'react-i18next';

const HistoryPage = () => {
  const { t } = useTranslation("history");
  const [selectedGun, setSelectedGun] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // Exemple de données historiques des armes
  const historyData = [
    { name: "M4A4", date: "2024-12-01", shots: 150, type: "Fusil d'assaut" },
    { name: "Glock", date: "2024-11-30", shots: 80, type: "Arme de poing" },
    { name: "AWP", date: "2024-11-29", shots: 40, type: "Sniper" },
    { name: "Famas", date: "2024-12-03", shots: 120, type: "Fusil d'assaut" },
  ];

  // Gestion des filtres et de la recherche
  const filteredData = historyData.filter(
    (gun) =>
      (filterType === "" || gun.type === filterType) &&
      (searchQuery === "" ||
        gun.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Gestion du tri
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    if (sortConfig.key === "shots" || sortConfig.key === "date") {
      const valueA = sortConfig.key === "shots" ? a[sortConfig.key] : new Date(a[sortConfig.key]);
      const valueB = sortConfig.key === "shots" ? b[sortConfig.key] : new Date(b[sortConfig.key]);
      return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
    }
    if (sortConfig.key === "name") {
      const direction = sortConfig.direction === "asc" ? 1 : -1;
      return a.name.localeCompare(b.name) * direction;
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleGunClick = (gun) => {
    setSelectedGun(gun);
  };

  const handleCloseDetails = () => {
    setSelectedGun(null);
  };

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Barre de recherche avec filtres */}
      <div className="mb-6">
        <SearchBar
          filterType={filterType}
          onTypeChange={setFilterType}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Tableau dynamique */}
      <div className="space-y-4">
        {/* Header du tableau */}
        <div className="flex justify-between items-center bg-gray-800 p-4 rounded-2xl font-bold">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => handleSort("name")}
          >
            {t("name")} {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </div>
          <div
            className="flex-1 cursor-pointer text-center"
            onClick={() => handleSort("date")}
          >
            {t("date")} {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </div>
          <div
            className="flex-1 cursor-pointer text-right"
            onClick={() => handleSort("shots")}
          >
            {t("shot")} {sortConfig.key === "shots" && (sortConfig.direction === "asc" ? "↑" : "↓")}
          </div>
        </div>

        {/* Lignes dynamiques */}
        {sortedData.map((gun, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-gray-800 p-4 rounded-full cursor-pointer hover:bg-gray-700 transition-all"
            onClick={() => handleGunClick(gun)}
          >
            <div className="flex-1">{gun.name}</div>
            <div className="flex-1 text-center">{gun.date}</div>
            <div className="flex-1 text-right">{gun.shots}</div>
          </div>
        ))}
      </div>

      {/* Modale de détails */}
      {selectedGun && (
        <GunDetails
          gun={{
            name: selectedGun.name,
            description: `Détails historiques de l'arme ${selectedGun.name}.`,
            caliber: "5.56mm", 
            weight: "3.4 kg", 
            speed: "900 m/s",
          }}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default HistoryPage;
