import { useTranslation } from 'react-i18next';

const SearchBar = ({ filterType, onTypeChange, customDesign }) => {
  const { t } = useTranslation("armory");
  const containerClass = customDesign || "flex items-center space-x-2 bg-primaryPale p-2 rounded-full w-1/2";

  return (
    <div className={containerClass}>

      {/* Liste déroulante pour filtrer par type */}
      <select
        value={filterType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="bg-primaryBrown text-white rounded-full px-2 py-2 focus:outline-none"
      >
        <option value="">{t("type_filter")}</option>
        <option value="Fusil d'assaut">{t('assault_rifle')}</option>
        <option value="Arme de poing">{t('pistol')}</option>
        <option value="Sniper">{t('sniper')}</option>
      </select>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder={t('search_bar')}
        className="w-full bg-primaryBrown placeholder-white focus:outline-none rounded-full px-2 py-2"
      />
    </div>
  );
};

export default SearchBar;

