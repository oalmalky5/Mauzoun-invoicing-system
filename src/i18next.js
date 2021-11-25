import i18next from 'i18next'
import {initReactI18next} from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATIONS_EN } from "./translation/en/translations";
import { TRANSLATIONS_AR } from "./translation/ar/translations";

const languages = ['en', 'ar'];
i18next
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // supportedLngs: ['en', 'ar'],
        fallbackLng: 'en',
        debug: true,
        whitelist: languages,
        // Options for language detector
        // detection: {
        //     order: ['cookie',"htmlTag", 'path', "localStorage"],
        //     caches: ['cookie'],
        // },
        // react: { useSuspense: false },
        // backend: {
        //     loadPath: '/assets/locales/{{lng}}/translation.json',
        // },
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['cookie',"htmlTag", 'path', "localStorage"],
            caches: ['cookie'],
        },
        resources: {
            ar: {
                translation: TRANSLATIONS_AR
            },
            en: {
                translation: TRANSLATIONS_EN
            }
        }
    });

export default i18next;
