import React from 'react';
import { useTranslation } from 'react-i18next';


const TargetComponent = ({ impacts }) => {
  const { t } = useTranslation('shot');

  return (
    <div className="relative w-40 h-40 bg-white rounded-full border-2 border-primaryDark flex items-center justify-center">
      <svg
        viewBox="-35 -35 70 70"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cercles de la cible */}
        <circle cx="0" cy="0" r="35" fill="#f5f5f5" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="28" fill="#e0e0e0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="21" fill="#c0c0c0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="14" fill="#a0a0a0" stroke="#000" strokeWidth="1" />
        <circle cx="0" cy="0" r="7" fill="#808080" stroke="#000" strokeWidth="1" />

        {/* Impacts */}
        {impacts.map((impact, index) => (
          <circle
            key={index}
            cx={impact.x * 7}
            cy={impact.y * 7}
            r="2"
            fill="red"
          />
        ))}
      </svg>
    </div>
  );
};

export default TargetComponent;
