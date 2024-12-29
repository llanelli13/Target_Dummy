import { useState } from 'react';
import VideoComponent from './VideoComponent';
import { useTranslation } from 'react-i18next';
import UnityPlayer from './UnityPlayer';

const GunDetails = ({ gun, onClose }) => {
  const { t } = useTranslation("armory");
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true); // Lorsque l'utilisateur clique sur "Play", on met isPlaying à true
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-primaryBrown text-white p-4 rounded-3xl w-2/6 h-1/2 flex flex-col">
        <div className="flex flex-row justify-between h-1/2">
          <div className="w-2/3 justify-center items-center bg-gray-700 rounded-2xl overflow-hidden">
            {/* Afficher Unity seulement après le clic sur le bouton Play */}
            <UnityPlayer />
          </div>

          <div className="w-1/2 flex flex-col pl-6">
            <div className="flex justify-center items-center relative">
              <h2 className="text-2xl font-bold mb-2 font-title text-black">{gun.name}</h2>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 bg-red-500 font-bold p-2 rounded-full hover:bg-red-600"
              >
                x
              </button>
            </div>
            {/* Utilisation de la clé de description avec t() */}
            <p className="text-md text-black mt-5 font-secondary">{t(gun.description)}</p>
          </div>
        </div>

        {/* Informations sur l'arme */}
        <div className="h-1/2">
          <ul className="space-y-1 text-sm mt-10">
            <li className="text-lg text-black">{t("caliber")} : {gun.caliber}</li>
            <li className="text-lg text-black">{t("weight")} : {gun.weight} kg</li>
            <li className="text-lg text-black">{t("speed")} : {gun.speed} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GunDetails;
