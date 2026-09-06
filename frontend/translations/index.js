import { en } from './en';
import { hi } from './hi';



export const translations = {
  en,
  hi
};



export function getTranslation(lang, key, params) {
  const dict = translations[lang] || translations.hi;
  let text = dict[key] || translations.en[key] || key;

  if (params) {
    Object.keys(params).forEach((pKey) => {
      text = text.replace(new RegExp(`{{${pKey}}}`, 'g'), params[pKey]);
    });
  }

  return text;
}