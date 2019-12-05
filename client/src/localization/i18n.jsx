import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en, cn } from ".";

const resources = {
  en,
  cn
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  debug: true,
  keySeparator: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
