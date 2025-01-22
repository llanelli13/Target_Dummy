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
import { useTranslation } from 'react-i18next';
import { useSession } from "../context/SessionContext";
import { getUserHistory } from "../api/shotSequenceAPI";

const HistoryPage = () => {
  const { t } = useTranslation("history");
  const { userID } = useSession();
  const [filterType, setFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchShotSequences = async () => {
      try {
        const data = await getUserHistory(userID);
        setHistoryData(data);
      } catch (error) {
        console.error('Error fetching shot sequences:', error);
      }
    };

    if (userID) {
      fetchShotSequences();
    }
  }, [userID]);

  // Gestion des filtres et de la recherche
  const filteredData = historyData.filter(
    (sequence) =>
      (filterType === "" || sequence.ID_weapon.weapon_type === filterType) &&
      (searchQuery === "" ||
        sequence.ID_weapon.name_weapon.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Gestion du tri
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    const valueA = sortConfig.key === "sequence_date" ? new Date(a[sortConfig.key]) : a[sortConfig.key];
    const valueB = sortConfig.key === "sequence_date" ? new Date(b[sortConfig.key]) : b[sortConfig.key];
    if (valueA < valueB) return sortConfig.direction === "ascending" ? -1 : 1;
    if (valueA > valueB) return sortConfig.direction === "ascending" ? 1 : -1;
    return 0;
  });

  return (
    <div>
      {console.log("historyData", historyData)}
      <SearchBar
        filterType={filterType}
        setFilterType={setFilterType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortConfig({ key: "sequence_date", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
              {t("history:date")}
            </th>
            <th onClick={() => setSortConfig({ key: "ID_weapon.name_weapon", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
              {t("history:weaponName")}
            </th>
            <th onClick={() => setSortConfig({ key: "location", direction: sortConfig.direction === "ascending" ? "descending" : "ascending" })}>
              {t("history:location")}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((sequence) => (
            <tr key={sequence._id}>
              <td>{new Date(sequence.sequence_date).toLocaleDateString()}</td>
              <td>{sequence.ID_weapon.name_weapon}</td>
              <td>{sequence.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryPage;