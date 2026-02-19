import { Injectable, InjectionToken, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18nConfig, LangCode, Language, LANGUAGES } from './language.model';

/** Injection token for per-app i18n configuration */
export const I18N_CONFIG = new InjectionToken<I18nConfig>('I18N_CONFIG');

@Injectable({ providedIn: 'root' })
export class LanguageService {

  private readonly translate = inject(TranslateService);
  private readonly config = inject(I18N_CONFIG);

  readonly currentLang = signal<LangCode>(this.config.defaultLang);

  /** Available languages filtered by config.supportedLangs */
  readonly languages: Language[] = LANGUAGES.filter(
    l => this.config.supportedLangs.includes(l.code)
  );

  init(): void {
    this.translate.addLangs(this.config.supportedLangs);
    this.translate.setDefaultLang(this.config.defaultLang);

    const saved = localStorage.getItem(this.config.storageKey) as LangCode | null;
    const browserLang = this.translate.getBrowserLang() as LangCode;
    const lang = saved
      ?? (this.config.supportedLangs.includes(browserLang) ? browserLang : null)
      ?? this.config.defaultLang;

    this.setLang(lang);
  }

  setLang(lang: LangCode): void {
    this.translate.use(lang);
    this.currentLang.set(lang);
    localStorage.setItem(this.config.storageKey, lang);
    document.documentElement.lang = lang === 'cs' ? 'pt' : lang;
  }

  /** Returns uppercase idioma key for backend queries (PT, EN, DE, CS) */
  getIdiomaKey(): 'PT' | 'EN' | 'DE' | 'CS' {
    return this.currentLang().toUpperCase() as 'PT' | 'EN' | 'DE' | 'CS';
  }

  /**
   * Extracts the localized value from an object using field-suffix convention.
   * E.g., getLocalizedField(article, 'titulo') reads article.tituloPt / tituloEn / etc.
   */
  getLocalizedField(obj: Record<string, unknown>, fieldBase: string): string {
    const lang = this.currentLang();
    const suffix = lang.charAt(0).toUpperCase() + lang.slice(1);
    const key = fieldBase + suffix;
    return (obj[key] as string) || (obj[fieldBase + 'Pt'] as string) || '';
  }
}
