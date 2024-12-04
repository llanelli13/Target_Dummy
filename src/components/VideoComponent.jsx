import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VideoComponent = ({ videoSrc }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(false); // État pour gérer les erreurs de lecture vidéo

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gray-800 rounded-2xl overflow-hidden">
      {/* Si aucune vidéo n'est fournie */}
      {!videoSrc ? (
        <p className="text-white text-lg font-semibold">{t("waiting_video")}</p>
      ) : (
        <video
          className="w-full h-full object-cover rounded-2xl"
          muted
          controls
          onError={() => setError(true)} // Détecter les erreurs de lecture
        >
          <source src={videoSrc} type="video/mp4" />
          {/* Si une erreur survient */}
          {error && (
            <p className="text-white text-lg font-semibold">
              {t("video_issue")}
            </p>
          )}
        </video>
      )}
    </div>
  );
};

export default VideoComponent;
