import React from 'react';

const UnityPlayer = ({ unityUrl }) => {
  return (
    <div className="unity-container w-full h-full relative overflow-hidden">
      <iframe
        src={unityUrl}
        title="Unity WebGL"
        className="w-full h-full absolute top-0 left-0"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default UnityPlayer;


