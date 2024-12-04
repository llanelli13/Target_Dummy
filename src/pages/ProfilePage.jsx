import { useState } from 'react';
import EditableField from '../components/EditableField';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { t, i18n } = useTranslation(); // i18n est récupéré ici via useTranslation
  const [name, setName] = useState('Prénom NOM');
  const [email, setEmail] = useState('prenom.nom@gmail.com');

  const handleNameSave = (newName) => setName(newName);
  const handleEmailSave = (newEmail) => setEmail(newEmail);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change la langue
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Positionnement du switch de langue en haut à droite */}
      <div className="absolute top-4 right-4 flex space-x-4">
        <button
          onClick={() => changeLanguage('fr')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
        >
          {t('français')}
        </button>
        <button
          onClick={() => changeLanguage('en')}
          className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700"
        >
          {t('english')}
        </button>
      </div>

      {/* Photo de profil et nom */}
      <div className="flex items-center">
        <div className='flex-shrink-0 relative'>
          <img
            src="https://imgs.search.brave.com/F8b10aLZNcq9daadBDD7wTtw4F-4kLsnwZlhyHet6M8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zMy56/ZXJvY2hhbi5uZXQv/MjQwLzIwLzI3LzM1/MDM4NzAuanBn"
            alt="Profile"
            className="h-32 w-32 rounded-full border-4 border-white"
          />
        </div>
        <span className="text-2xl text-white bg-gray-800 px-4 py-2 rounded-r-full -ml-2">
          {name}
        </span>
      </div>

      {/* Champs modifiables */}
      <EditableField label={t('name')} value={name} onSave={handleNameSave} />
      <EditableField label={t('email')} value={email} onSave={handleEmailSave} />

      {/* Bouton de suppression */}
      <div>
        <button className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700">
          {t('delete_history')} {/* Traduction pour supprimer l'historique */}
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
