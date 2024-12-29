import { useTranslation } from 'react-i18next';

const GunCard = ({ gun, onClick }) => {
  const { t } = useTranslation("armory");

  return (
    <div className="bg-primaryPale text-white rounded-3xl p-4 hover:shadow-secondaryPale hover:shadow-lg transition cursor-pointer" onClick={onClick}>
      <img src={gun.image} alt={gun.name} className="w-full h-32 object-cover rounded-3xl shadow-md shadow-primaryDark" />
      <h3 className="text-xl font-bold mt-2 text-black">{gun.name}</h3>
      <p className="text-sm text-black font-semibold mt-1">{t(gun.description)}</p>
      <button className="mt-4 text-blue-500 hover:text-blue-700">{t("details")}</button>
    </div>
  );
};

export default GunCard;
