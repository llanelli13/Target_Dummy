import { useSession } from '../context/SessionContext';
import SessionComponent from '../components/SessionComponent';
import UnityPlayer from '../components/UnityPlayer';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';
import TargetComponent from '../components/TargetComponent';
import { useState, useRef } from 'react';
import { createShotSequence } from '../api/shotSequenceAPI';
import { useMode } from '../context/ModeContext';

const ShotScreen = () => {
  const { t } = useTranslation('shot');
  const { isSessionOpen, startSession, endSession, sessionData, userID } = useSession();
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const [precision, setPrecision] = useState('0%');
  const [speed, setSpeed] = useState('0 m/s');
  const [angle, setAngle] = useState('0°');
  const { mode } = useMode();
  const [ unityURL, setUnityUrl] = useState('')
  const [sequenceData, setSequenceData] = useState([])

  const [heartImpacts, setHeartImpacts] = useState([{ x: -0.20, y: 4.5 }, { x: 0.10, y: -0.15 }])
  const [headImpacts, setHeadImpacts] = useState([]);
  const [stomachImpacts, setStomachImpacts] = useState([]);
  const headSocketRef = useRef(null)
  const stomachSocketRef = useRef(null)

  const openConnection = () => {
    // Connection pour head
    headSocketRef.current = new WebSocket('ws://192.168.7.1:81');
    console.log("Established head socket", headSocketRef.current);

    window.headSocketRef = headSocketRef;

    headSocketRef.current.addEventListener('open', function () {
      console.log("WebSocket connection for head established");
    });

    headSocketRef.current.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      console.log("head data", data)
    
      setHeadImpacts((prev) => [...prev, {x: data.x, y:data.y}])
      setSequenceData(prevData => [...prevData, {position: data, target: 'Head', target_hit:"Head"}])
      setUnityUrl(determineUnityUrl(sessionData.arme, "Head"))
    });

      // Connection for stomach target
    stomachSocketRef.current = new WebSocket('ws://192.168.7.211:81');
    console.log("Established stomach socket", stomachSocketRef.current);

    window.stomachSocketRef = stomachSocketRef;

    stomachSocketRef.current.addEventListener('open', function () {
      console.log("WebSocket connection for stomach established");
    });

    stomachSocketRef.current.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      console.log("stomach data", data);
      
      setStomachImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
      setSequenceData(prevData => [...prevData, {position: data, target: 'Stomach', target_hit:"Stomach"}])
      setUnityUrl(determineUnityUrl(sessionData.arme, "Stomach"))
    });

    return () => {
      headSocketRef.current.close();
      stomachSocketRef.current.close()
    };
  };

  const determineUnityUrl = (arme, impactLocation) => {
    if (arme === "AWP" && impactLocation === "Stomach") {
      return '/AWP_Tir/Tir/Torse/index.html'
    } else if (arme === "AWP" && impactLocation === "Head") {
      return '/AWP_Tir/Tir/HS/index.html'
    } else if (arme === "M4A4" && impactLocation === "Stomach") {
      return '/M4A4_Tir/Tir/Torse/index.html'
    } else if (arme === "M4A4" && impactLocation === "Head") {
      return '/M4A4_Tir/Tir/HS/index.html'
    } else if (arme === "Glock 23" && impactLocation === "Stomach") {
      return '/Glock 23_Tir/Tir/Torse/index.html'
    } else if (arme === "Glock 23" && impactLocation === "Head") {
      return '/Glock 23_Tir/Tir/HS/index.html'
    }
  }

  const closeConnection = () => {
    if (headSocketRef.current || stomachSocketRef.current) {
      headSocketRef.current.close();
      stomachSocketRef.current.close();
      console.log("WebSocket connection closed");
    }
  };

  const handleEndSession = async () => {

    const shotSequenceData = {
      sequence_date: new Date(sessionData?.dateHeure).toISOString(),
      ID_weapon: sessionData?.idWeapon,
      ID_user: userID,
      // firing_mode: sessionData?.modeTir,
      shot_power: score,
      distance: 80,
      location: "Range B",
      sequence_data: sequenceData
    };

    try {
      await createShotSequence(shotSequenceData);
      endSession();
      setUnityUrl("")
      setHeadImpacts([])
      setHeartImpacts([])
      setStomachImpacts([])
      closeConnection();
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de la séquence de tir', err);
    }
  };

  return (
    <div className='relative'>
      <div className={`space-y-6 ${!isSessionOpen ? 'blur-sm pointer-events-none' : ''}`}>
      <button onClick={openConnection}>Open Connection</button>
      {/* <button onClick={closeConnection}>Close Connection</button> */}
        <div className="flex justify-between items-center bg-primaryBrown p-4 rounded-2xl text-black font-bold font-secondary text-lg">
          <p>
            {t('welcome')} {user?.user_firstname} !
          </p>
          <button
            onClick={handleEndSession}
            className="bg-primaryPale text-black px-4 py-2 rounded-full hover:bg-secondaryPale"
          >
            {t('endSession')}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow w-2/3 h-[calc(85vh-220px)]">
            {unityURL ? (
              <UnityPlayer unityUrl={unityURL} />
            ) : (
              <div className="flex items-center justify-center h-full text-lg font-bold">
                En attente de votre tir
              </div>
            )
            }
          </div>

          <div className="flex flex-col space-y-6 md:w-1/3 md:h-1/2 bg-primaryBrown rounded-2xl p-6">
            <InfoBox icon="🎯" titleKey="precision" value={precision} />
            <InfoBox icon="🏹" titleKey="precision_shot" value={speed} />
            <InfoBox icon="⭐" titleKey="score" value={`${score}`} />
          </div>
        </div>

        <div className="flex justify-around bg-primaryBrown rounded-2xl p-4">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white font-secondary font-semibold">{mode === "Military" ? t('heart') : t('target1')}</span>
            <TargetComponent impacts={heartImpacts} />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white font-secondary font-semibold">{mode === "Military" ? t('head') : t('target2')}</span>
            <TargetComponent impacts={headImpacts} />
          </div>
          <div className="flex flex-col items-center space-y-2">
            <span className="text-white font-secondary font-semibold">{mode === "Military" ? t('stomach') : t('target2')}</span>
            <TargetComponent impacts={stomachImpacts} />
          </div>
        </div>
      </div>

      {!isSessionOpen && (
        <div>
          <SessionComponent onClose={startSession} />
        </div>
      )}
    </div>
  );
}

export default ShotScreen;