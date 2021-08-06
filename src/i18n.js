import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Translations } from './translations';

// i18n wants a single object in the following format:
// {
//   'en-US': {
//     translation: {
//       title: 'WiFi Card',,
//       ...
//     }
//   },
// }
const resources = Translations.reduce((obj, curr) => {
  obj[curr.id] = curr;
  return obj;
}, {});

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en-US',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
