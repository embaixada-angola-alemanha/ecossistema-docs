export type LangCode = 'pt' | 'en' | 'de' | 'cs';

export interface Language {
  code: LangCode;
  label: string;
  flag?: string;
}

export const LANGUAGES: Language[] = [
  { code: 'pt', label: 'Português', flag: '🇦🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'cs', label: 'Čeština', flag: '🇨🇿' }
];

export interface I18nConfig {
  defaultLang: LangCode;
  supportedLangs: LangCode[];
  storageKey: string;
}
