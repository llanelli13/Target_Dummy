import React from 'react';
import { useTranslation } from 'react-i18next';


const TargetComponent = ({ impacts }) => {
  const { t } = useTranslation('shot');

  return (
    <div className="relative w-32 h-32 bg-white rounded-full border-2 border-primaryDark flex items-center justify-center">
      <svg
        viewBox="-50 -50 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cercles de la cible */}
        <circle cx="0" cy="0" r="50" fill="#f5f5f5" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="40" fill="#e0e0e0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="30" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="20" fill="#a0a0a0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="10" fill="#808080" stroke="#000" strokeWidth="1" />

        {/* Impacts */}
        {impacts.map((impact, index) => (
          <circle
            key={index}
            cx={impact.x}
            cy={impact.y}
            r="2"
            fill="red"
          />
        ))}
      </svg>
    </div>
  );
};

export default TargetComponent;
