import React from 'react';

const TargetComponent = ({ impacts }) => {
  // impacts : tableau d'objets contenant { x, y } pour chaque point d'impact

  return (
    <div className="relative w-40 h-40 flex justify-center items-center">
      {/* SVG de la cible */}
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Cercles concentriques pour la cible */}
        <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="38" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="28" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="18" stroke="black" strokeWidth="1" fill="none" />
        <circle cx="50" cy="50" r="8" stroke="black" strokeWidth="1" fill="none" />
      </svg>

      {/* Points d'impact */}
      {impacts.map((impact, index) => (
        <div
          key={index}
          className="absolute w-2 h-2 bg-red-600 rounded-full"
          style={{
            left: `calc(${impact.x}% - 4px)`, // Centrage horizontal du point
            top: `calc(${impact.y}% - 4px)`, // Centrage vertical du point
          }}
        ></div>
      ))}
    </div>
  );
};

export default TargetComponent;
