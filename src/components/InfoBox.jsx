// src/components/InfoBox.jsx
import React from 'react';

const InfoBox = ({ icon, title, value }) => {
  return (
    <div className="flex items-center bg-gray-700 p-4 rounded-lg shadow-md">
      <div className="text-3xl mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  );
};

export default InfoBox;
