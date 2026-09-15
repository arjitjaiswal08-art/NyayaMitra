import { en } from './en';
import { hi } from './hi';
import { ta } from './ta';
import { te } from './te';
import { bn } from './bn';
import { mr } from './mr';
import { gu } from './gu';
import { kn } from './kn';

export const TRANSLATIONS = {
  en,
  hi,
  ta,
  te,
  bn,
  mr,
  gu,
  kn
};

export function getTranslation(lang = 'en') {
  return TRANSLATIONS[lang] || TRANSLATIONS.en;
}

export { en, hi, ta, te, bn, mr, gu, kn };
