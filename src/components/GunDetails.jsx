// src/components/GunDetails.jsx
import React from "react";

const GunDetails = ({ gun, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-3/4 lg:w-1/2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-red-500 rounded-full p-2 hover:bg-red-600 transition"
        >
          X
        </button>
        <div className="flex flex-col items-center">
          <img src={gun.image} alt={gun.name} className="h-48 w-48 object-cover rounded-md" />
          <h2 className="text-2xl font-bold mt-4">{gun.name}</h2>
          <p className="mt-2 text-gray-700">{gun.description}</p>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Informations</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Calibre: {gun.caliber}</li>
              <li>Poids: {gun.weight} kg</li>
              <li>Vitesse: {gun.speed} m/s</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GunDetails;
