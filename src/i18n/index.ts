import { es } from './translations/es';
import { en } from './translations/en';
import type { Language } from './languages';
import { defaultLang } from './languages';

export const translations = {
  es,
  en,
} as const;

export function useTranslations(lang?: Language) {
  // Si se proporciona un idioma explícito, usarlo
  if (lang && lang in translations) {
    return translations[lang];
  }
  
  // Por defecto, usar español
  return translations[defaultLang];
}
