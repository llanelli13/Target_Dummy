import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

const calculateStats = (sequenceData) => {
  console.log("data :", sequenceData)
  const totalShots = sequenceData.length;

  // Tirs prévus (où `target` est défini)
  const shotsWithTarget = sequenceData.filter((shot) => shot.target).length;

  // Tirs touchés (longueur totale des données)
  const accurateShots = totalShots;

  // Tirs manqués
  const missedShots = sequenceData.filter(
    (shot) => shot.target && shot.target !== shot.target_hit
  ).length;

  // Meilleur tir (distance euclidienne minimale à (0,0))
  const bestShot = sequenceData.reduce((best, shot) => {
    const distance = Math.sqrt(shot.position_x ** 2 + shot.position_y ** 2);
    return !best || distance < best.distance ? { ...shot, distance } : best;
  }, null);

  // Nombre de tirs par cible
  const shotsByTargetHit = sequenceData.reduce((acc, shot) => {
    acc[shot.target_hit] = (acc[shot.target_hit] || 0) + 1;
    return acc;
  }, {});

  // Distribution par quadrants
  const quadrants = {
    Q1: 0,
    Q2: 0,
    Q3: 0,
    Q4: 0,
  };
  sequenceData.forEach((shot) => {
    if (shot.position_x > 0 && shot.position_y > 0) quadrants.Q1++;
    if (shot.position_x < 0 && shot.position_y > 0) quadrants.Q2++;
    if (shot.position_x < 0 && shot.position_y < 0) quadrants.Q3++;
    if (shot.position_x > 0 && shot.position_y < 0) quadrants.Q4++;
  });

  // Précision par cible
  const targetStats = Object.keys(shotsByTargetHit).reduce((acc, target) => {
    const targetShots = sequenceData.filter((shot) => shot.target_hit === target);
    const precision = targetShots.reduce((sum, shot) => {
      const xPrecision = 1 - Math.abs(shot.position_x);
      const yPrecision = 1 - Math.abs(shot.position_y);
      return sum + (xPrecision + yPrecision) / 2;
    }, 0);
    acc[target] = {
      count: targetShots.length,
      precision: (precision / targetShots.length).toFixed(2) || "0",
    };
    return acc;
  }, {});

  // Score global
  const globalScore = (
    Object.values(targetStats).reduce((sum, target) => sum + parseFloat(target.precision), 0) /
    Object.keys(targetStats).length
  ).toFixed(2);

  return {
    totalShots,
    shotsWithTarget,
    accurateShots,
    missedShots,
    bestShot,
    shotsByTargetHit,
    quadrants,
    targetStats,
    globalScore,
  };
};

const HistoryDetails = ({ session, onClose }) => {
  const stats = calculateStats(session.sequence_data);

  // Données pour les plots
  const scatterDataGlobal = {
    datasets: [
      {
        label: "Tirs",
        data: session.sequence_data.map((shot) => ({
          x: shot.position_x,
          y: shot.position_y,
        })),
        backgroundColor: session.sequence_data.map((shot) =>
          shot.target && shot.target === shot.target_hit ? "green" : "red"
        ),
      },
      {
        label: "Centre",
        data: [{ x: 0, y: 0 }], // Point noir au centre
        backgroundColor: "black",
        pointRadius: 5, // Taille du point au centre
      },
    ],
  };

  // Options communes pour les cartes 2D
  const scatterOptions = {
    scales: {
      x: {
        type: "linear",
        min: -1,
        max: 1,
        grid: {
          color: "#808080", // Couleur de la grille
        },
        ticks: {
          display: false, // Désactiver les ticks (échelle) sur l'axe X
        },
      },
      y: {
        type: "linear",
        min: -1,
        max: 1,
        grid: {
          color: "#808080", // Couleur de la grille
        },
        ticks: {
          display: false, // Désactiver les ticks (échelle) sur l'axe Y
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Pas de légende nécessaire
      },
    },
    maintainAspectRatio: true, // Maintenir le ratio pour que le plot reste carré
    aspectRatio: 1, // Ratio carré
  };

  return (
    <div className="history-details-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{session.ID_weapon.name_weapon}</h2>
        <button
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
          onClick={onClose}
        >
          x
        </button>
      </div>

      {/* Stats globales */}
      <div className="history-details-section">
        <h3>Statistiques globales :</h3>
        <ul className="history-details-list">
          <li>Nombre total de tirs : {stats.totalShots}</li>
          <li>Tirs prévus : {stats.shotsWithTarget}</li>
          <li>Tirs touchés : {stats.accurateShots}</li>
          <li>Tirs manqués : {stats.missedShots}</li>
          <li>
            Meilleur tir :{" "}
            {stats.bestShot && (
              <>
                à ({stats.bestShot.position_x.toFixed(2)},{" "}
                {stats.bestShot.position_y.toFixed(2)})
              </>
            )}
          </li>
        </ul>
        {stats.bestShot && (
          <div className="history-details-chart mt-4">
            <Scatter
              data={{
                datasets: [
                  {
                    label: "Meilleur tir",
                    data: [
                      {
                        x: stats.bestShot.position_x,
                        y: stats.bestShot.position_y,
                      },
                    ],
                    backgroundColor: "blue",
                  },
                  {
                    label: "Centre",
                    data: [{ x: 0, y: 0 }],
                    backgroundColor: "black",
                    pointRadius: 5,
                  },
                ],
              }}
              options={scatterOptions}
            />
          </div>
        )}
      </div>

      {/* Nombre de tirs par cible */}
      <div className="history-details-section">
        <h3>Nombre de tirs par cible :</h3>
        <ul className="history-details-list">
          {Object.entries(stats.shotsByTargetHit).map(([target, count]) => (
            <li key={target}>
              {target} : {count} tirs
            </li>
          ))}
        </ul>
      </div>

      {/* Carte 2D globale */}
      <div className="history-details-section">
        <h3>Carte 2D globale :</h3>
        <div className="history-details-chart">
          <Scatter data={scatterDataGlobal} options={scatterOptions} />
        </div>
      </div>

      {/* Distribution par quadrants */}
      <div className="history-details-section">
        <h3>Distribution par quadrants :</h3>
        <div className="history-details-quadrants">
          {Object.entries(stats.quadrants).map(([quadrant, count]) => (
            <div key={quadrant} className="history-details-quadrant">
              {quadrant} : {count} tirs
            </div>
          ))}
        </div>
      </div>

      {/* Stats par cible */}
      {Object.entries(stats.targetStats).map(([target, data]) => (
        <div key={target} className="history-details-section">
          <h3>Statistiques pour {target} :</h3>
          <p>Précision moyenne : {data.precision}%</p>
          <div className="history-details-chart">
            <Scatter
              data={{
                datasets: [
                  {
                    label: target,
                    data: session.sequence_data
                      .filter((shot) => shot.target_hit === target)
                      .map((shot) => ({
                        x: shot.position_x,
                        y: shot.position_y,
                      })),
                    backgroundColor: "orange",
                  },
                  {
                    label: "Centre",
                    data: [{ x: 0, y: 0 }],
                    backgroundColor: "black",
                    pointRadius: 5,
                  },
                ],
              }}
              options={scatterOptions}
            />
          </div>
        </div>
      ))}

      {/* Score global */}
      <div className="history-details-section">
        <h3>Score global de la session :</h3>
        <p className="history-details-score">{stats.globalScore}%</p>
      </div>
    </div>
  );
};

export default HistoryDetails;
