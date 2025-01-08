import { useTranslation } from 'react-i18next';

const InfoBox = ({ icon, titleKey, value }) => {
  const { t } = useTranslation("shot");

  return (
    <div className="flex items-center bg-primaryPale p-4 rounded-2xl shadow-md">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-bold font-secondary text-black">{t(titleKey)}</h3>
        <p className="text-sm font-secondary text-black">{value}</p>
      </div>
    </div>
  );
};

export default InfoBox;
