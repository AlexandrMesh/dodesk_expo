import i18n from 'i18next';
import { EN, RU } from '~constants/languages';
import detectLanguage from '~utils/detectLanguage';
import commonEn from './locales/en/common.json';
import errorsEn from './locales/en/errors.json';
import listsEn from './locales/en/lists.json';
import tasksEn from './locales/en/tasks.json';
import common from './locales/ru/common.json';
import errors from './locales/ru/errors.json';
import lists from './locales/ru/lists.json';
import tasks from './locales/ru/tasks.json';

const LanguageDetector = {
  type: 'languageDetector',
  async: false,
  detect: () => detectLanguage(),
  init: () => {},
  cacheUserLanguage: () => {}
};

i18n.use(LanguageDetector).init({
  fallbackLng: EN,
  compatibilityJSON: 'v3',
  supportedLngs: [RU, EN],
  nonExplicitSupportedLngs: true,
  load: 'languageOnly',
  lowerCaseLng: true,
  interpolation: { escapeValue: false },
  resources: {
    [RU]: {
      common,
      tasks,
      lists,
      errors
    },
    [EN]: {
      common: commonEn,
      tasks: tasksEn,
      lists: listsEn,
      errors: errorsEn
    }
  }
});

export const getT = (namespace) => i18n.getFixedT(i18n.language, namespace);

export default i18n;
