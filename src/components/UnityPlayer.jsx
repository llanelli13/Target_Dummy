import React from 'react';

const UnityPlayer = () => {
  // L'URL de ton fichier index.html généré par Unity dans le dossier public
  const unityUrl = '/WebGL Builds/index.html';

  return (
    <div className="unity-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        src={unityUrl}
        title="Unity WebGL"
        width="100%"
        height="600"  // Tu peux ajuster la hauteur selon tes besoins
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',  // Ceci ajuste le rendu pour être responsive
        }}
      />
    </div>
  );
};

export default UnityPlayer;
