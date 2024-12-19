import VideoComponent from "./VideoComponent";
import { useTranslation } from 'react-i18next';

const GunDetails = ({ gun, onClose }) => {
  const { t } = useTranslation("armory");

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-4 rounded-3xl w-2/6 h-1/2 flex flex-col">
        <div className="flex flex-row justify-between h-1/2">
          <div className="w-2/3 justify-center items-center bg-gray-700 rounded-2xl overflow-hidden">
            <VideoComponent videoSrc={"/BANGER4.mp4"} />
          </div>

          <div className="w-1/2 flex flex-col pl-6">
            <div className="flex justify-center items-center relative">
              <h2 className="text-2xl font-semibold mb-2">{gun.name}</h2>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                x
              </button>
            </div>
            {/* Utilisation de la clé de description avec t() */}
            <p className="text-sm text-gray-300 mt-5">{t(gun.description)}</p>
          </div>
        </div>

        {/* Informations sur l'arme */}
        <div className="h-1/2">
          <ul className="space-y-1 text-sm mt-10">
            <li className="text-lg">{t("caliber")} : {gun.caliber}</li>
            <li className="text-lg">{t("weight")} : {gun.weight} kg</li>
            <li className="text-lg">{t("speed")} : {gun.speed} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GunDetails;
