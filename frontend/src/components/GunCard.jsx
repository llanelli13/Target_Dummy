import { useTranslation } from 'react-i18next';

const GunCard = ({ gun, onClick }) => {
  const { t } = useTranslation("armory");

  // Fonction pour tronquer le texte
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <div
      className="bg-primaryPale text-white rounded-3xl p-4 hover:shadow-secondaryPale hover:shadow-lg transition cursor-pointer"
      onClick={onClick}
    >
      <img
        src={gun.weapon_image}
        alt={gun.name_weapon}
        className="w-full h-32 object-cover rounded-3xl shadow-md shadow-primaryDark"
      />
      <h3 className="text-xl font-bold mt-2 text-black">{gun.name_weapon}</h3>
      <p className="text-sm text-black font-semibold mt-1">
        {truncateText(t(gun.description), 100)}
      </p>
      <button className="mt-4 text-blue-500 hover:text-blue-700">{t("details")}</button>
    </div>
  );
};

export default GunCard;
