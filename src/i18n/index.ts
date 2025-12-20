import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import koCommon from './locales/ko/common.json';
import enCommon from './locales/en/common.json';

import koMain from './locales/ko/main.json';
import enMain from './locales/en/main.json';

import koWeek1 from './locales/ko/week1.json';
import enWeek1 from './locales/en/week1.json';

import koWeek2 from './locales/ko/week2.json';
import enWeek2 from './locales/en/week2.json';

import koWeek3 from './locales/ko/week3.json';
import enWeek3 from './locales/en/week3.json';

import koWeek4 from './locales/ko/week4.json';
import enWeek4 from './locales/en/week4.json';

import koWeek5 from './locales/ko/week5.json';
import enWeek5 from './locales/en/week5.json';

import koWeek6 from './locales/ko/week6.json';
import enWeek6 from './locales/en/week6.json';

import koWeek7 from './locales/ko/week7.json';
import enWeek7 from './locales/en/week7.json';

import koWeek8 from './locales/ko/week8.json';
import enWeek8 from './locales/en/week8.json';

import koWeek9 from './locales/ko/week9.json';
import enWeek9 from './locales/en/week9.json';

import koWeek10 from './locales/ko/week10.json';
import enWeek10 from './locales/en/week10.json';

import koWeek11 from './locales/ko/week11.json';
import enWeek11 from './locales/en/week11.json';

import koWeek12 from './locales/ko/week12.json';
import enWeek12 from './locales/en/week12.json';

import koWeek13 from './locales/ko/week13.json';
import enWeek13 from './locales/en/week13.json';

import koWeek14 from './locales/ko/week14.json';
import enWeek14 from './locales/en/week14.json';

import koWeek15 from './locales/ko/week15.json';
import enWeek15 from './locales/en/week15.json';

const resources = {
  ko: {
    common: koCommon,
    main: koMain,
    week1: koWeek1,
    week2: koWeek2,
    week3: koWeek3,
    week4: koWeek4,
    week5: koWeek5,
    week6: koWeek6,
    week7: koWeek7,
    week8: koWeek8,
    week9: koWeek9,
    week10: koWeek10,
    week11: koWeek11,
    week12: koWeek12,
    week13: koWeek13,
    week14: koWeek14,
    week15: koWeek15,
  },
  en: {
    common: enCommon,
    main: enMain,
    week1: enWeek1,
    week2: enWeek2,
    week3: enWeek3,
    week4: enWeek4,
    week5: enWeek5,
    week6: enWeek6,
    week7: enWeek7,
    week8: enWeek8,
    week9: enWeek9,
    week10: enWeek10,
    week11: enWeek11,
    week12: enWeek12,
    week13: enWeek13,
    week14: enWeek14,
    week15: enWeek15,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
