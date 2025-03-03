import React, { useEffect, useState } from "react";
import { getShotSequencesSortedByScore } from "../api/shotSequenceGLOAPI";
import { FaMedal, FaStar, FaRegStar } from "react-icons/fa";

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  // console.log(leaderboardData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShotSequencesSortedByScore();
        setLeaderboardData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération du leaderboard :", error);
      }
    };

    fetchData();
  }, []);

  if (leaderboardData.length === 0) {
    return (
      <div className="text-black text-center mt-10">
        Chargement des scores...
      </div>
    );
  }

  // Fonction pour générer les étoiles en fonction du score (sur 5)
  const getStars = (score) => {
    const maxScore = Math.max(...leaderboardData.map((player) => player.score));
    const stars = Math.round((score / maxScore) * 5);
    return (
      <>
        {[...Array(5)].map((_, i) =>
          i < stars ? (
            <FaStar key={i} className="text-yellow-400" />
          ) : (
            <FaRegStar key={i} className="text-gray-500" />
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center text-black p-8 min-h-screen">
      <h1 className="text-5xl font-bold mb-8 border-b-4 border-[#C19A6B] pb-2 flex items-center gap-4 text-white">
        🏆 LEADERBOARD 🏆
      </h1>

      <div className="w-full max-w-3xl">
        {leaderboardData.map((player, index) => (
          <div
            key={player._id}
            className={`flex items-center justify-between p-3 mb-3 rounded-lg shadow-lg bg-[#C19A6B]`}
          >
            {/* Rang + Médaille */}
            <div className="flex items-center gap-3 w-12 text-center">
              {index === 0 && <FaMedal className="text-yellow-400 text-3xl" />}
              {index === 1 && <FaMedal className="text-gray-300 text-3xl" />}
              {index === 2 && <FaMedal className="text-orange-500 text-3xl" />}
              {index >= 3 && (
                <span className="text-xl font-bold">{index + 1}</span>
              )}
            </div>

            {/* Nom + Arme */}
            <div className="flex flex-col flex-1">
              <span className="text-lg font-semibold">{player.name}</span>
              <span className="text-sm text-gray-700">"M4"</span>
            </div>

            {/* Score & Étoiles */}
            <div className="flex items-center gap-3">
              <div className="flex">{getStars(player.score)}</div>
              <span className="text-lg font-bold">{player.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
