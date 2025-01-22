import { useSession } from '../context/SessionContext';
import SessionComponent from '../components/SessionComponent';
import UnityPlayer from '../components/UnityPlayer';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';
import TargetComponent from '../components/TargetComponent';
import { useState, useEffect } from 'react';
import { createShotSequence } from '../api/shotSequenceAPI';
import { io } from 'socket.io-client';

const ShotScreen = () => {
  const { t } = useTranslation('shot');
  const { isSessionOpen, startSession, endSession, sessionData, userID } = useSession();
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  const [precision, setPrecision] = useState('0%');
  const [speed, setSpeed] = useState('0 m/s');
  const [angle, setAngle] = useState('0°');
  const [heartImpacts, setHeartImpacts] = useState([{ x: 5, y: -10 }, { x: -10, y: 15 }]);
  const [headImpacts, setHeadImpacts] = useState([{ x: -20, y: 20 }, { x: 10, y: -15 }]);
  const [stomachImpacts, setStomachImpacts] = useState([{ x: 0, y: 0 }, { x: -15, y: 5 }]);
  // const socket = useState(() => io('ws://your-websocket-server.com'))[0];

  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on('targetData', (data) => {
  //     if (data.target === 'heart') {
  //       setHeartImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
  //     } else if (data.target === 'head') {
  //       setHeadImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
  //     } else if (data.target === 'stomach') {
  //       setStomachImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
  //     }
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [socket]);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch(`/api/users/${userID}`);
  //       const data = await response.json();
  //       console.log("data : ", data);
  //       setUser(data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   if (userID) {
  //     fetchUserData();
  //   } 
  // }, [userID]);


  const handleEndSession = async () => {

    console.log("sessionData : ", sessionData); 
    const shotSequenceData = {
      sequence_date: new Date(sessionData?.dateHeure).toISOString(),
      ID_weapon: sessionData?.idWeapon,
      ID_user: userID,
      // firing_mode: sessionData?.modeTir,
      shot_power: score,
      distance: 80,
      location: "Range B",
      impacts: {
        heart: heartImpacts,
        head: headImpacts,
        stomach: stomachImpacts
      }
    };

    console.log('Enregistrement de la séquence de tir', shotSequenceData);

    try {
      await createShotSequence(shotSequenceData);
      endSession();
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de la séquence de tir', err);
    }
  };


  return (
    <div className='relative'>
      <div className={`space-y-6 ${!isSessionOpen ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="flex justify-between items-center bg-primaryBrown p-4 rounded-2xl text-black font-bold font-secondary text-lg">
          <p>
            {t('welcome')} {user?.name} !
          </p>
          <button
            onClick={handleEndSession}
            className="bg-primaryPale text-black px-4 py-2 rounded-full hover:bg-secondaryPale"
          >
            {t('endSession')}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-grow w-2/3 h-auto">
            {/* <UnityPlayer unityUrl="/WebGL Builds Shoot/shot.html" /> */}
          </div>

          <div className="flex flex-col space-y-6 md:w-1/3 bg-primaryBrown rounded-2xl p-6">
            <InfoBox icon="🎯" titleKey="precision" value={precision} />
            <InfoBox icon="🏹" titleKey="speed" value={speed} />
            <InfoBox icon="📐" titleKey="angle" value={angle} />
            <InfoBox icon="⭐" titleKey="score" value={`${score}`} />
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

      {!isSessionOpen && (
        <div>
          <SessionComponent onClose={startSession} />
        </div>
      )}
    </div>
  );
};

export default ShotScreen;


