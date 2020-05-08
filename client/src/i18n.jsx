import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';

import { SETTINGS } from './constants';

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: SETTINGS.DEFAULT_LANGUAGE,
    debug: SETTINGS.IS_DEVELOPMENT,

    react: {
      useSuspense: false,
    },
  });

export default i18n;
