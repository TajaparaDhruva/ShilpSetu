import { en } from './en.js';
import { hi } from './hi.js';



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