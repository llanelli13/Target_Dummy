import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Optionnel : Charge les fichiers de traduction depuis un backend ou localement
  .use(LanguageDetector) // Détecte automatiquement la langue (par navigateur, cookie, etc.)
  .use(initReactI18next) // Initialise i18next pour React
  .init({
    fallbackLng: 'fr', // Langue par défaut
    debug: true, // Active le mode debug pour voir les logs dans la console
    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs, donc false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // Chemin des fichiers de traduction
    },
  });

export default i18n;
