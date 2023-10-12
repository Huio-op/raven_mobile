import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import pt_BR from './locales/ptBR';
import en_US from './locales/enUS';
import yup from './service/yup';

const resources = {
  pt_BR: {
    translation: pt_BR,
  },
  en_US: {
    translation: en_US,
  },
};

const onLanguageChange = (lang) => {
  const data = i18n.getDataByLanguage(lang ?? i18n.language).translation.formik;
  yup.setLocale(data);
};

i18n.use(initReactI18next).init(
  {
    compatibilityJSON: 'v3',
    resources,
    lng: 'pt_BR',
    interpolation: {
      escapeValue: false,
    },
  },
  () => {
    onLanguageChange(i18n.language);
  }
);

export default i18n;
