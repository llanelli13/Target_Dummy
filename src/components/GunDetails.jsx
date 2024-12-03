import React from "react";

const GunDetails = ({ gun, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-4 rounded-3xl w-2/6 h-1/2 flex flex-col">
        <div className="flex flex-row justify-between h-1/2">
          {/* Vidéo à gauche */}
          <div className="w-1/2 h-full bg-gray-700 rounded-2xl overflow-hidden">
            <video
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              controls
            >
              <source src={gun.video || "/BANGER4.mp4"} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>

          {/* Contenu texte à droite */}
          <div className="w-1/2 flex flex-col pl-6">
            <div className="flex justify-center items-center relative">
              <h2 className="text-2xl font-semibold mb-2">{gun.name}</h2>
              {/* Le bouton x est positionné absolument en haut à droite */}
              <button
                onClick={onClose}
                className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              >
                x
              </button>
            </div>
            <p className="text-sm text-gray-300 mt-5">{gun.description}</p>
          </div>
        </div>

        {/* Informations sur l'arme */}
        <div className="h-1/2">
          <ul className="space-y-1 text-sm mt-10">
            <li className="text-lg">Calibre : {gun.caliber}</li>
            <li className="text-lg">Poids : {gun.weight} kg</li>
            <li className="text-lg">Vitesse : {gun.speed} m/s</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GunDetails;
