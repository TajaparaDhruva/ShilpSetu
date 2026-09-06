import { en } from './en';
import { hi } from './hi';

export type LanguageCode = 'hi' | 'en';

export const translations = {
  en,
  hi,
};

export type TranslationKeys = keyof typeof en;

export function getTranslation(lang: LanguageCode, key: TranslationKeys, params?: Record<string, string>): string {
  const dict = translations[lang] || translations.hi;
  let text = dict[key] || translations.en[key] || key;

  if (params) {
    Object.keys(params).forEach((pKey) => {
      text = text.replace(new RegExp(`{{${pKey}}}`, 'g'), params[pKey]);
    });
  }

  return text;
}
