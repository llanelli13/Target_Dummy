import { useSession } from '../context/SessionContext';
import SessionComponent from '../components/SessionComponent';
import UnityPlayer from '../components/UnityPlayer';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';
import TargetComponent from '../components/TargetComponent';

const ShotScreen = () => {
  const { t } = useTranslation('shot');
  const { isSessionOpen, startSession, endSession } = useSession();

  const heartImpacts = [{ x: 5, y: -10 }, { x: -10, y: 15 }];
  const headImpacts = [{ x: -20, y: 20 }, { x: 10, y: -15 }];
  const stomachImpacts = [{ x: 0, y: 0 }, { x: -15, y: 5 }];

  return (
    <div className='relative '>
      <div className={`space-y-6 ${!isSessionOpen ? "blur-sm pointer-events-none" : ""}`}>
        <div className="flex justify-between items-center bg-primaryBrown p-4 rounded-2xl text-black font-bold font-secondary text-lg">
          <p>
            {t('welcome')} {`{Username}`} !
          </p>
          <button
            onClick={endSession} 
            className="bg-primaryPale text-black px-4 py-2 rounded-full hover:bg-secondaryPale"
          >
            {t("endSession")}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow w-2/3 h-auto">
            <UnityPlayer unityUrl="/WebGL Builds Shoot/shot.html" />
          </div>

          <div className="flex flex-col space-y-6 md:w-1/3 bg-primaryBrown rounded-2xl p-6">
            <InfoBox icon="🎯" titleKey="precision" value="79%" />
            <InfoBox icon="🏹" titleKey="speed" value="300 m/s" />
            <InfoBox icon="📐" titleKey="angle" value="210°" />
            <InfoBox icon="⭐" titleKey="score" value="3.9/5" />
          </div>
        </div>

        <div className="flex justify-around bg-primaryBrown rounded-2xl p-4">
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white font-secondary font-semibold">{t('heart')}</span>
                <TargetComponent impacts={heartImpacts} />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white font-secondary font-semibold">{t('head')}</span>
                <TargetComponent impacts={headImpacts} />
              </div>
              <div className="flex flex-col items-center space-y-2">
                <span className="text-white font-secondary font-semibold">{t('stomach')}</span>
                <TargetComponent impacts={stomachImpacts} />
              </div>
            </div>
      </div>

      {!isSessionOpen && 
        <div>
          <SessionComponent onClose={startSession} />
        </div>
      } 
    </div>
  );
};

export default ShotScreen;
