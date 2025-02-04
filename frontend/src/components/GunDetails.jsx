import { useTranslation } from 'react-i18next';
import UnityPlayer from './UnityPlayer';

const GunDetails = ({ gun, onClose }) => {
  const { t } = useTranslation("armory");
  console.log("info :", gun)
  const unityURL = `/${gun.name_weapon}_Inspect/Inspect/index.html`

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-primaryBrown text-white p-4 rounded-3xl w-2/6 h-1/2 flex flex-col">
        <div className="flex flex-row justify-between h-1/2">
          <div className="w-2/3 flex justify-center items-center bg-gray-700 rounded-2xl overflow-hidden relative">
            {/* Ensure UnityPlayer fills its container */}
            <UnityPlayer unityUrl={unityURL} />
          </div>

          <div className="w-1/2 flex flex-col pl-6">
            <div className="flex justify-center items-center relative">
              <h2 className="text-3xl font-bold mb-2 font-title text-black">{gun.name_weapon}</h2>
              <button
                onClick={onClose}
                className="absolute top-0 right-0 bg-primaryDark font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-primaryPale"
              >
                X
              </button>
            </div>
            <p className="text-md text-black mt-5 font-secondary">{t(gun.description)}</p>
          </div>
        </div>

        {/* Gun Details */}
        <div className="h-1/2">
          <ul className="space-y-1 text-sm mt-10">
            <li className="text-lg text-black">{t("caliber")} : {gun.weapon_caliber}</li>
            <li className="text-lg text-black">{t("weight")} : {gun.weapon_weight} kg</li>
            <li className="text-lg text-black">{t("speed")} : {gun.weapon_power} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GunDetails;
