import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import des fichiers de traduction JSON
import translationFR from './locales/fr/translationFR.json';
import ArmoryFR from './locales/fr/ArmoryFR.json';
import ProfileFR from './locales/fr/ProfileFR.json';
import SessionFR from './locales/fr/SessionFR.json';
import ShotFR from './locales/fr/ShotFR.json';
import LayoutFR from './locales/fr/LayoutFR.json';
import HistoryFR from './locales/fr/HistoryFR.json';

import translationEN from './locales/en/translationEN.json';
import ArmoryEN from './locales/en/ArmoryEN.json';
import ProfileEN from './locales/en/ProfileEN.json';
import SessionEN from './locales/en/SessionEN.json';
import ShotEN from './locales/en/ShotEN.json';
import LayoutEN from './locales/en/LayoutEN.json';
import HistoryEN from './locales/en/HistoryEN.json';
i18n
  .use(LanguageDetector) // Détecte automatiquement la langue (par navigateur, cookie, etc.)
  .use(initReactI18next) // Initialise i18next pour React
  .init({
    resources: {
      en: {
        translation: translationEN,
        armory: ArmoryEN,
        profile: ProfileEN,
        session: SessionEN,
        shot: ShotEN,
        layout: LayoutEN,
        history: HistoryEN
      },
      fr: {
        translation: translationFR,
        armory: ArmoryFR,
        profile: ProfileFR,
        session: SessionFR,
        shot: ShotFR,
        layout: LayoutFR,
        history: HistoryFR
      },
    },
    fallbackLng: 'fr', 
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
