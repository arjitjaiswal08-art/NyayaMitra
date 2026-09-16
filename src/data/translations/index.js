import { en } from './en.js';
import { hi } from './hi.js';
import { ta } from './ta.js';
import { te } from './te.js';
import { bn } from './bn.js';
import { mr } from './mr.js';
import { gu } from './gu.js';
import { kn } from './kn.js';

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
