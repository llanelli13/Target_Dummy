// src/components/VideoComponent.jsx
import React from 'react';

const VideoComponent = () => {
  return (
    <div className="flex justify-center items-center bg-teal-500 rounded-2xl h-[100%]">
      <button className="text-white text-lg font-semibold">
        ▶ En attente de votre tir...
      </button>
    </div>
  );
};

export default VideoComponent;
