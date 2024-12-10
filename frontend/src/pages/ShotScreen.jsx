import VideoComponent from '../components/VideoComponent';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';

const ShotScreen = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <div className="bg-gray-700 p-4 rounded-2xl">
        <p>{t('welcome')} {`{Username}`} !</p>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Composant Vidéo */}
        <div className="flex-grow w-2/3 h-auto">
          <VideoComponent />
        </div>

        {/* Composants d’informations */}
        <div className="flex flex-col space-y-6 md:w-1/3">
          <InfoBox icon="🎯" titleKey="precision" value="...%" />
          <InfoBox icon="🏹" titleKey="speed" value="... m/s" />
          <InfoBox icon="📐" titleKey="angle" value="...°" />
          <InfoBox icon="⭐" titleKey="score" value=".../5" />
        </div>
      </div>
    </div>
  );
};

export default ShotScreen;
