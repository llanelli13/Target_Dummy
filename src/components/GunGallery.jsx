// src/components/GunGallery.jsx
import React from 'react';
import GunCard from './GunCard';

const GunGallery = () => {
  const guns = [
    { name: 'M4A4', imageUrl: '/path/to/m4a4-image.png' },
    { name: 'Glock', imageUrl: '/path/to/glock-image.png' },
    { name: 'Ak-47', imageUrl: '/path/to/ak47-image.png' },
    { name: 'Famas', imageUrl: '/path/to/famas-image.png' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
      {guns.map((gun, index) => (
        <GunCard key={index} name={gun.name} imageUrl={gun.imageUrl} />
      ))}
    </div>
  );
};

export default GunGallery;
