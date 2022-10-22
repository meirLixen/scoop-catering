import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';

import { He } from './He';
import { En } from './En';
const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: cb => cb('en'),
    init: () => { },
    cacheUserLanguage: () => { },
};
i18
    .use(languageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            he: He,
            en: En,
        },
        //language to use if translations in user language are not available
        fallbackLng: "en",
        interpolation: {
            escapeValue: false, // not needed for react!!
        }
    });

export default i18;