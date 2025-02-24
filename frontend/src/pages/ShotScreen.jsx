import { useSession } from '../context/SessionContext';
import SessionComponent from '../components/SessionComponent';
import UnityPlayer from '../components/UnityPlayer';
import TargetComponent from '../components/TargetComponent';
import InfoBox from '../components/InfoBox';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { createShotSequence } from '../api/shotSequenceAPI';
import { useMode } from '../context/ModeContext';


const ShotScreen = () => {
  const { t } = useTranslation('shot');
  const { isSessionOpen, startSession, endSession, sessionData, userID } = useSession();
  const [user, setUser] = useState(null);
  const [score, setScore] = useState(0);
  // const [precision, setPrecision] = useState('0%'); 
  // const [speed, setSpeed] = useState('0 m/s');
  // const [angle, setAngle] = useState('0°');
  const [sessionPrecision, setSessionPrecision] = useState('0%');
  const { mode } = useMode();
  const [unityURL, setUnityUrl] = useState('');
  const [sequenceData, setSequenceData] = useState([]);

  // Impacts pour chaque cible
  const [heartImpacts, setHeartImpacts] = useState([{ x: -0.20, y: 2.5 }, { x: 0.10, y: -0.15 }]);
  const [headImpacts, setHeadImpacts] = useState([{x:0, y:5.8}]);
  const [stomachImpacts, setStomachImpacts] = useState([{x: 0, y: 0}, {x: 1, y: 2}]);
  const extraImpacts = [];

  const URL_HeadSocket = "ws://192.168.7.1:81"
  const URL_StomachSocket = 'ws://192.168.7.211:81'
  // const URL_RightShoulderSocket = 'ws://'
  // const URL_LeftShoulderSocket = 'ws://'
  // const URL_M4A4Socket = 'ws://'

  const headSocketRef = useRef(null);
  const stomachSocketRef = useRef(null);

  const MAX_DISTANCE = 7;

  const computeShotPrecision = (shot, maxDistance = MAX_DISTANCE) => {
    const d = Math.sqrt(shot.x * shot.x + shot.y * shot.y);
    let shotPrecision = 100 - (d / maxDistance * 100);
    if (shotPrecision < 0) shotPrecision = 0;
    return shotPrecision;
  };

  const calculatePrecision = (impacts, maxDistance = MAX_DISTANCE) => {
    if (impacts.length === 0) return 0;
    const total = impacts.reduce((sum, shot) => sum + computeShotPrecision(shot, maxDistance), 0);
    return Math.round(total / impacts.length);
  };

  // Mise à jour de sessionPrecision : moyenne des précisions des cibles ayant reçu au moins un impact
  useEffect(() => {
    const targetPrecisions = [];
    if (heartImpacts.length > 0) targetPrecisions.push(calculatePrecision(heartImpacts));
    if (headImpacts.length > 0) targetPrecisions.push(calculatePrecision(headImpacts));
    if (stomachImpacts.length > 0) targetPrecisions.push(calculatePrecision(stomachImpacts));
    if (extraImpacts.length > 0) targetPrecisions.push(calculatePrecision(extraImpacts));

    if (targetPrecisions.length === 0) {
      setSessionPrecision("0%");
    } else {
      const avg = Math.round(targetPrecisions.reduce((sum, p) => sum + p, 0) / targetPrecisions.length);
      setSessionPrecision(avg + "%");
    }
  }, [heartImpacts, headImpacts, stomachImpacts, extraImpacts]);

  useEffect(() => {
    if (isSessionOpen) {
      openConnection();
    }
    return () => {
      closeConnection();
    };
  }, [isSessionOpen]);

  const openConnection = () => {
    // Connection pour la cible "head"
    headSocketRef.current = new WebSocket(URL_HeadSocket);
    console.log("Connexion en cours à", URL_HeadSocket);
    window.headSocketRef = headSocketRef;

    headSocketRef.current.addEventListener('open', function () {
      console.log("WebSocket connection for head established");
    });

    headSocketRef.current.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      console.log("head data", data);
      setHeadImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
      setSequenceData(prevData => [
        ...prevData,
        { position_x: data.x / 7, position_y: data.y / 7, target: 'Head', target_hit: "Head" }
      ]);
      setUnityUrl(determineUnityUrl(sessionData.arme, "Head"));

      if (mode === "Competitive" && shotInProgress && currentTarget === "Head") {
        shotHit(data);
      } else if (mode === "Competitive" && shotInProgress && currentTarget !== "Head") {
        // Tir sur mauvaise cible (exemple)
        shotWrongTarget(data, "Head");
      }

    });


    // Connection pour la cible "stomach"
    stomachSocketRef.current = new WebSocket(URL_StomachSocket);
    console.log("Connexion en cours à", URL_StomachSocket);
    window.stomachSocketRef = stomachSocketRef;

    stomachSocketRef.current.addEventListener('open', function () {
      console.log("WebSocket connection for stomach established");
    });

    stomachSocketRef.current.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);
      console.log("stomach data", data);
      setStomachImpacts((prev) => [...prev, { x: data.x, y: data.y }]);
      setSequenceData(prevData => [
        ...prevData,
        { position_x: data.x / 7, position_y: data.y / 7, target: 'Stomach', target_hit: "Stomach" }
      ]);
      setUnityUrl(determineUnityUrl(sessionData.arme, "Stomach"));
      if (mode === "Competitive" && shotInProgress && currentTarget === "Stomach") {
        shotHit(data);
      } else if (mode === "Competitive" && shotInProgress && currentTarget !== "Stomach") {
        shotWrongTarget(data, "Stomach");
      }
    });

    return () => {
      headSocketRef.current.close();
      stomachSocketRef.current.close();
    };
  };

  const determineUnityUrl = (arme, impactLocation) => {
    if (arme === "AWP" && impactLocation === "Stomach") {
      return '/AWP_Tir/Tir/Torse/index.html';
    } else if (arme === "AWP" && impactLocation === "Head") {
      return '/AWP_Tir/Tir/HS/index.html';
    } else if (arme === "M4A4" && impactLocation === "Stomach") {
      return '/M4A4_Tir/Tir/Torse/index.html';
    } else if (arme === "M4A4" && impactLocation === "Head") {
      return '/M4A4_Tir/Tir/HS/index.html';
    } else if (arme === "Glock 23" && impactLocation === "Stomach") {
      return '/Glock 23_Tir/Tir/Torse/index.html';
    } else if (arme === "Glock 23" && impactLocation === "Head") {
      return '/Glock 23_Tir/Tir/HS/index.html';
    }
  };

  const closeConnection = () => {
    if (headSocketRef.current || stomachSocketRef.current) {
      headSocketRef.current.close();
      stomachSocketRef.current.close();
      console.log("WebSocket connection closed");
    }
  };

  // ---------------------------
  // Partie mode jeu compétitif
  // (Cette logique ne s'exécute que si mode === "Competitive")
  // ---------------------------
  const [gameShotCount, setGameShotCount] = useState(0);
  const [currentTarget, setCurrentTarget] = useState(null);
  const [shotStartTime, setShotStartTime] = useState(null);
  const [shotInProgress, setShotInProgress] = useState(false);
  const shotTimerRef = useRef(null);

  // Démarrage du mode compétitif lors de l'ouverture de la session
  useEffect(() => {
    if (isSessionOpen && mode === "Competitive") {
      setTimeout(() => {
        startGameMode();
      }, 1000);
    }
  }, [isSessionOpen, mode]);

  const sendLEDMessage = (target, command) => {
    const message = JSON.stringify({ command });
    switch (target) {
      case "Head":
        if (headSocketRef.current && headSocketRef.current.readyState === WebSocket.OPEN) {
          headSocketRef.current.send(message);
        }
        break;
      case "Stomach":
        if (stomachSocketRef.current && stomachSocketRef.current.readyState === WebSocket.OPEN) {
          stomachSocketRef.current.send(message);
        }
        break;
      case "Heart":
        console.log(`Simulated send to Heart: ${message}`);
        break;
      case "Extra":
        console.log(`Simulated send to Extra: ${message}`);
        break;
      default:
        break;
    }
  };

  const startGameMode = () => {
    // Si le mode n'est pas compétitif, ne rien faire
    if (mode !== "Competitive") return;
    setGameShotCount(0);
    nextShot();
  };

  const nextShot = () => {
    if (gameShotCount >= 10) {
      handleEndSession();
      return;
    }
    // Sélection aléatoire d'une cible parmi 4
    const targets = ["Heart", "Head", "Stomach", "Extra"];
    const selectedTarget = targets[Math.floor(Math.random() * targets.length)];
    setCurrentTarget(selectedTarget);
    console.log("Prochain tir sur la cible :", selectedTarget);

    // Envoi du message pour allumer les LEDs uniquement en mode compétitif
    sendLEDMessage(selectedTarget, "LED_ON");

    setShotStartTime(Date.now());
    setShotInProgress(true);

    // Timer de 3 secondes
    shotTimerRef.current = setTimeout(() => {
      if (shotInProgress) {
        shotMissed();
      }
    }, 3000);
  };

  const shotHit = (data) => {
    if (shotTimerRef.current) clearTimeout(shotTimerRef.current);
    const reactionTime = Date.now() - shotStartTime;
    console.log("Tir réussi sur", currentTarget, "!", "Temps de réaction :", reactionTime, "ms");
    const shotScore = reactionTime <= 3000 ? (3000 - reactionTime) : 0;
    setScore(prev => prev + shotScore);

    // Éteindre la LED de la cible courante
    sendLEDMessage(currentTarget, "LED_OFF");

    setShotInProgress(false);
    setGameShotCount(prev => prev + 1);

    setTimeout(() => {
      nextShot();
    }, 1000);
  };

  const shotWrongTarget = (data, receivedTarget) => {
    if (shotTimerRef.current) clearTimeout(shotTimerRef.current);
    console.log(`Tir sur mauvaise cible : ${receivedTarget} reçu alors que ${currentTarget} était attendu – Score: 0`);
    // Enregistrement de la séquence avec score 0 (optionnel)
    setSequenceData(prev => [
      ...prev,
      {
        position_x: data.x / 7,
        position_y: data.y / 7,
        target: currentTarget,
        target_hit: receivedTarget,
        score: 0
      }
    ]);
    sendLEDMessage(currentTarget, "LED_OFF");
    setShotInProgress(false);
    setGameShotCount(prev => prev + 1);
    setTimeout(() => {
      nextShot();
    }, 1000);
  };

  const shotMissed = () => {
    console.log("Tir manqué sur la cible :", currentTarget);
    sendLEDMessage(currentTarget, "LED_OFF");
    setShotInProgress(false);
    setGameShotCount(prev => prev + 1);
    setTimeout(() => {
      nextShot();
    }, 1000);
  };

  // ---------------------------
  // Fin partie mode compétitif
  // ---------------------------

  const handleEndSession = async () => {
    if (shotTimerRef.current) clearTimeout(shotTimerRef.current);
    closeConnection();
    const shotSequenceData = {
      sequence_date: new Date(sessionData?.dateHeure).toISOString(),
      ID_weapon: sessionData?.idWeapon,
      ID_user: userID,
      shot_power: score,
      distance: 80,
      location: "Range B",
      sequence_data: sequenceData
    };

    try {
      await createShotSequence(shotSequenceData);
      endSession();
      setUnityUrl("");
      setHeadImpacts([]);
      setHeartImpacts([]); 
      setStomachImpacts([]);
      
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de la séquence de tir', err);
    }
  };

  return (
    <div className='relative'>
      <div className={`space-y-6 ${!isSessionOpen ? 'blur-sm pointer-events-none' : ''}`}>
        {/* <button onClick={openConnection}>Open Connection</button> */}
        <div className="flex justify-between items-center bg-primaryBrown p-4 rounded-2xl text-black font-bold font-secondary text-lg">
          <p>{t('welcome')} {user?.user_firstname} !</p>
          <button
            onClick={handleEndSession}
            className="bg-primaryPale text-black px-4 py-2 rounded-full hover:bg-secondaryPale"
          >
            {t('endSession')}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {/* Section principale : UnityPlayer et grille des cibles */}
          <div className="flex gap-6 h-[60vh]">
            {/* UnityPlayer en 3/5 de la largeur */}
            <div className="w-3/5 bg-primaryBrown rounded-2xl">
              {unityURL ? (
                <UnityPlayer unityUrl={unityURL} />
              ) : (
                <div className="flex items-center justify-center h-full text-lg font-bold text-black">
                  En attente de votre tir
                </div>
              )}
            </div>
            {/* Grille 2x2 de TargetComponent en 2/5 de la largeur */}
            <div className="w-2/5 grid grid-cols-2 grid-rows-2 gap-6">
              <div className="flex flex-col items-center space-y-2 bg-primaryBrown rounded-2xl p-4">
                <span className="text-white font-secondary font-semibold">
                  {mode === "Military" ? t('heart') : t('target1')}
                </span>
                <TargetComponent impacts={heartImpacts} />
                <p className="mt-2 text-sm text-white">
                  {t('heartPrecision')} : {calculatePrecision(heartImpacts)}%
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-primaryBrown rounded-2xl p-4">
                <span className="text-white font-secondary font-semibold">
                  {mode === "Military" ? t('head') : t('target2')}
                </span>
                <TargetComponent impacts={headImpacts} />
                <p className="mt-2 text-sm text-white">
                {t('headPrecision')} {calculatePrecision(headImpacts)}%
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-primaryBrown rounded-2xl p-4">
                <span className="text-white font-secondary font-semibold">
                  {mode === "Military" ? t('stomach') : t('target3')}
                </span>
                <TargetComponent impacts={stomachImpacts} />
                <p className="mt-2 text-sm text-white">
                {t('stomachPrecision')} {calculatePrecision(stomachImpacts)}%
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 bg-primaryBrown rounded-2xl p-4">
                <span className="text-white font-secondary font-semibold">{t('target4')}</span>
                <TargetComponent impacts={extraImpacts} />
                <p className="mt-2 text-sm text-white">
                {t('shoulderPrecision')} {calculatePrecision(extraImpacts)}%
                </p>
              </div>
            </div>
          </div>

          {/* Section en bas : barre d'infos et graphique */}
          <div className="w-full flex gap-6">
            <div className="flex-1">
              <InfoBox icon="📊" titleKey="sessionPrecision" value={sessionPrecision} />
            </div>
            <div className="flex-1">
              <InfoBox icon="📊" titleKey="shotPrecision" value="80%" />
            </div>
            <div className="flex-1">
              <InfoBox icon="📊" titleKey="shotStability" value="0%" />
            </div>
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
