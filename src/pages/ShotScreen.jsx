import TargetComponent from '../components/TargetComponent';
import VideoComponent from '../components/VideoComponent';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import SessionComponent from '../components/SessionComponent';
import UnityPlayer from '../components/UnityPlayer';

const ShotScreen = () => {
  const { t } = useTranslation("shot");
  const [OpenSession, setOpenSession] = useState(null)

  const sampleImpacts1 = [{ x: 50, y: 50 }, { x: 30, y: 70 }];
  const sampleImpacts2 = [{ x: 60, y: 40 }, { x: 20, y: 80 }];
  const sampleImpacts3 = [{ x: 10, y: 90 }];
  const sampleImpacts4 = [{ x: 70, y: 30 }, { x: 50, y: 50 }];

  const handleCloseDetails = () => {
    setOpenSession(1);
  };


  return (
    <div>
      <div className={`space-y-6 ${OpenSession ? "blur-sm pointer-events-none" : ""}`}>
        {/* Message de bienvenue */}
        <div className="bg-primaryBrown p-4 rounded-2xl text-black font-bold font-secondary text-lg">
          <p>
            {t('welcome')} {`{Username}`} !
          </p>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Composant Vidéo */}
          <div className="flex-grow w-2/3 h-auto">
            <UnityPlayer />
          </div>

          {/* Composants d’informations */}
          <div className="flex flex-col space-y-6 md:w-1/3 bg-primaryBrown rounded-2xl p-6">
            <InfoBox icon="🎯" titleKey="precision" value="79%" />
            <InfoBox icon="🏹" titleKey="speed" value="300 m/s" />
            <InfoBox icon="📐" titleKey="angle" value="210°" />
            <InfoBox icon="⭐" titleKey="score" value="3.9/5" />
          </div>
        </div>

        {/* Affichage des cibles */}
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <TargetComponent impacts={sampleImpacts1} />
          <TargetComponent impacts={sampleImpacts2} />
          <TargetComponent impacts={sampleImpacts3} />
          <TargetComponent impacts={sampleImpacts4} />
        </div> */}
      </div>
      {/* {!OpenSession && (<SessionComponent onClose={handleCloseDetails}/>)} */}
    </div>
  );
};

export default ShotScreen;
