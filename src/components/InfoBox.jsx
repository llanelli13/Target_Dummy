import { useTranslation } from 'react-i18next';

const InfoBox = ({ icon, titleKey, value }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center bg-darkGray p-4 rounded-2xl shadow-md">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{t(titleKey)}</h3>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};

export default InfoBox;
