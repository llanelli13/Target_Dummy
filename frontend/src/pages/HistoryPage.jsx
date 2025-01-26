// import { useState, useEffect } from "react";
// import SearchBar from "../components/SearchBar";
// import { useTranslation } from 'react-i18next';
// import { useSession } from "../context/SessionContext";
// import { getUserHistory } from "../api/shotSequenceAPI";

// const HistoryPage = () => {
//   const { t } = useTranslation("history");
//   const { userID } = useSession();
//   const [filterType, setFilterType] = useState("");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
//   const [historyData, setHistoryData] = useState([]);
//   const [selectedHistory, setSelectedHistory] = useState(null);

//   useEffect(() => {
//     const fetchShotSequences = async () => {
//       try {
//         const response = await getUserHistory(userID);
//         setHistoryData(response);
//       } catch (error) {
//         console.error('Error fetching shot sequences:', error);
//       }
//     };

//     if (userID) {
//       fetchShotSequences();
//     }
//   }, [userID]);

//   // Gestion des filtres et de la recherche
//   const filteredData = historyData.filter(
//     (gun) =>
//       (filterType === "" || gun.type === filterType) &&
//       (searchQuery === "" ||
//         gun.name.toLowerCase().includes(searchQuery.toLowerCase()))
//   );

//   // Gestion du tri
//   const sortedData = [...filteredData].sort((a, b) => {
//     if (sortConfig.key === null) return 0;
//     if (sortConfig.key === "shots" || sortConfig.key === "date") {
//       const valueA = sortConfig.key === "shots" ? a[sortConfig.key] : new Date(a[sortConfig.key]);
//       const valueB = sortConfig.key === "shots" ? b[sortConfig.key] : new Date(b[sortConfig.key]);
//       if (valueA < valueB) return sortConfig.direction === "ascending" ? -1 : 1;
//       if (valueA > valueB) return sortConfig.direction === "ascending" ? 1 : -1;
//       return 0;
//     }
//     return 0;
//   });

//   return (
//     <div>
//       <SearchBar
//         filterType={filterType}
//         setFilterType={setFilterType}
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//       />
//       <table>
//         <thead>
//           <tr>
//             <th onClick={() => setSortConfig({ key: "name", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
//               {t("history:gunName")}
//             </th>
//             <th onClick={() => setSortConfig({ key: "date", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
//               {t("history:date")}
//             </th>
//             <th onClick={() => setSortConfig({ key: "shots", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
//               {t("history:shots")}
//             </th>
//             <th>{t("history:type")}</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sortedData.map((gun) => (
//             <tr key={gun._id} onClick={() => setSelectedHistory(gun)}>
//               <td>{gun.name}</td>
//               <td>{new Date(gun.date).toLocaleDateString()}</td>
//               <td>{gun.shots}</td>
//               <td>{gun.type}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default HistoryPage;

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { useTranslation } from "react-i18next";
import { useSession } from "../context/SessionContext";
import { getUserHistory } from "../api/shotSequenceAPI";
import HistoryDetails from "../components/HistoryDetails";

const HistoryPage = () => {
  const { t } = useTranslation("history");
  const { userID } = useSession();
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [historyData, setHistoryData] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null); // Utilisé pour afficher les détails de la session

  // Récupération des données utilisateur
  useEffect(() => {
    const fetchShotSequences = async () => {
      try {
        const data = await getUserHistory(userID);
        setHistoryData(data);
      } catch (error) {
        console.error("Error fetching shot sequences:", error);
      }
    };

    if (userID) {
      fetchShotSequences();
    }
  }, [userID]);

  // Gestion du tri
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.direction === "ascending" ? "descending" : "ascending",
    });
  };

  // Tri et filtrage des données
  const sortedData = [...historyData]
    .filter(
      (sequence) =>
        (filterType === "" || sequence.ID_weapon.weapon_type === filterType) &&
        (searchQuery === "" ||
          sequence.ID_weapon.name_weapon.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortConfig.key === null) return 0;
      const valueA =
        sortConfig.key === "sequence_date" ? new Date(a[sortConfig.key]) : a[sortConfig.key];
      const valueB =
        sortConfig.key === "sequence_date" ? new Date(b[sortConfig.key]) : b[sortConfig.key];
      if (valueA < valueB) return sortConfig.direction === "ascending" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });

  // Gestion des clics sur une session
  const handleSessionClick = (session) => {
    console.log("Détails sur la session : ", session); // Log des détails de la session
    setSelectedSession(session); // Ouvre la fenêtre avec la session sélectionnée
  };

  const handleCloseDetailsSession = () => {
    setSelectedSession(null); // Ferme la fenêtre
  };

  return (
    <div className="p-6 text-white min-h-screen">
      {/* Barre de recherche avec filtres */}
      <div className="mb-6">
        <SearchBar
          filterType={filterType}
          setFilterType={setFilterType}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Tableau dynamique */}
      <div className="space-y-4">
        {/* Header du tableau */}
        <div className="flex justify-between items-center bg-primaryBrown p-4 rounded-2xl font-bold">
          <div
            className="flex-1 cursor-pointer"
            onClick={() => handleSort("sequence_date")}
          >
            {t("history:date")}{" "}
            {sortConfig.key === "sequence_date" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </div>
          <div
            className="flex-1 cursor-pointer text-center"
            onClick={() => handleSort("ID_weapon.name_weapon")}
          >
            {t("history:weaponName")}{" "}
            {sortConfig.key === "ID_weapon.name_weapon" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </div>
          <div
            className="flex-1 cursor-pointer text-right"
            onClick={() => handleSort("location")}
          >
            {t("history:location")}{" "}
            {sortConfig.key === "location" &&
              (sortConfig.direction === "ascending" ? "↑" : "↓")}
          </div>
        </div>

        {/* Lignes dynamiques */}
        {sortedData.map((sequence) => (
          <div
            key={sequence._id}
            className="flex justify-between items-center bg-primaryPale p-4 rounded-full cursor-pointer hover:bg-secondaryPale transition-all"
            onClick={() => handleSessionClick(sequence)} // Appel correct
          >
            <div className="flex-1 text-black">{new Date(sequence.sequence_date).toLocaleDateString()}</div>
            <div className="flex-1 text-center text-black">{sequence.ID_weapon.name_weapon}</div>
            <div className="flex-1 text-right text-black">{sequence.location}</div>
          </div>
        ))}
      </div>

      {/* Affichage des détails */}
      {selectedSession && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <HistoryDetails session={selectedSession} onClose={handleCloseDetailsSession} />
        </div>
      )}
    </div>
  );
};

export default HistoryPage;

