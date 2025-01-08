import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const VideoComponent = ({ unityHtmlFile }) => {
  const { t } = useTranslation();
  const iframeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!iframeRef.current) return;

    // Change the source of the iframe to load the Unity WebGL HTML
    iframeRef.current.src = unityHtmlFile;

    // Handle the loading and error states based on the iframe content
    const iframe = iframeRef.current;
    iframe.onload = () => {
      setLoading(false);
    };

    iframe.onerror = () => {
      setError(true);
    };
  }, [unityHtmlFile]);

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-primaryBrown rounded-2xl overflow-hidden">
      {loading ? (
        <p className="text-white text-xl font-bold">{t("loading_game")}</p>
      ) : error ? (
        <p className="text-white text-lg font-semibold">{t("game_load_error")}</p>
      ) : (
        <iframe
          ref={iframeRef}
          className="w-full h-full rounded-2xl"
          title="Unity Game"
          frameBorder="0"
        />
      )}
    </div>
  );
};

export default VideoComponent;
