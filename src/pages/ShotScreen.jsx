import React from 'react';
import VideoComponent from '../components/VideoComponent';
import InfoBox from '../components/InfoBox';

const ShotScreen = () => {
  return (
    <div className="space-y-5">
      {/* Message de bienvenue */}
      <div className="bg-gray-700 p-4 rounded-lg">
        <p>Bonjour {`{Username}`} !</p>
        <p>La cible n’attend que toi... Prépare-toi et tire !</p>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col md:flex-row gap-5">
        {/* Composant Vidéo */}
        <div className="flex-grow">
          <VideoComponent />
        </div>

        {/* Composants d’informations */}
        <div className="flex flex-col space-y-5 md:w-1/3">
          <InfoBox icon="🎯" title="Précision" value="...%" />
          <InfoBox icon="🏹" title="Vitesse" value="... m/s" />
          <InfoBox icon="📐" title="Angle" value="...°" />
          <InfoBox icon="⭐" title="Score" value=".../5" />
        </div>
      </div>
    </div>
  );
};

export default ShotScreen;
