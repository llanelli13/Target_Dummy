import { useTranslation } from 'react-i18next';

const GunCard = ({ gun, onClick }) => {
  const { t } = useTranslation("armory");

  return (
    <div className="bg-gray-800 text-white rounded-3xl p-4 hover:shadow-md hover:shadow-tan hover:shadow-lg transition cursor-pointer" onClick={onClick}>
      <img src={gun.image} alt={gun.name} className="w-full h-32 object-cover rounded-3xl" />
      <h3 className="text-xl font-semibold mt-2">{gun.name}</h3>
      <p className="text-sm mt-1">{t(gun.description)}</p>
      <button className="mt-4 text-blue-500 hover:text-blue-700">{t("details")}</button>
    </div>
  );
};

export default GunCard;
