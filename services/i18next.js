import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; 
import en from '../locales/en.json';
import es from '../locales/es.json';

export const languageResources = {
  en: { translation: en },
  es: { translation: es },
};

// Inicializa i18next
i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: Localization.locale.startsWith('es') ? 'es' : 'en', 
  fallbackLng: 'en', //lenguaje de respaldo
  resources: languageResources,
  interpolation: {
    escapeValue: false, 
  },
});

export default i18next;

