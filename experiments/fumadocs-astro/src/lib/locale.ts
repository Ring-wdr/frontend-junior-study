import { isLocale, type Locale } from '@/i18n/config';

export function toLocale(lang: string): Locale {
  if (!isLocale(lang)) throw new Error(`Unsupported locale "${lang}"`);
  return lang;
}
