import React from 'react';

const UnityPlayer = ({ unityUrl }) => {

  return (
    <div className="unity-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <iframe
        src={unityUrl}
        title="Unity WebGL"
        width="100%"
        height="600"  
        style={{
          border: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
        }}
      />
    </div>
  );
};

export default UnityPlayer;
