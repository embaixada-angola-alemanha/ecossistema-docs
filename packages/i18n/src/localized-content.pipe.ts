import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

/** Translation array item (used by SI CMS pages) */
export interface TranslationItem {
  idioma: 'PT' | 'EN' | 'DE' | 'CS';
  titulo: string;
  conteudo: string;
  excerto: string;
}

/**
 * Pipe for array-of-translations localization pattern.
 * Usage: {{ page.translations | localizedContent:'titulo' }}
 */
@Pipe({ name: 'localizedContent', standalone: true, pure: false })
export class LocalizedContentPipe implements PipeTransform {

  private readonly langService = inject(LanguageService);

  transform(translations: TranslationItem[] | undefined, field: 'titulo' | 'conteudo' | 'excerto'): string {
    if (!translations || translations.length === 0) return '';

    const idioma = this.langService.getIdiomaKey();
    const found = translations.find(t => t.idioma === idioma);
    const fallback = translations.find(t => t.idioma === 'PT') ?? translations[0];
    const translation = found ?? fallback;

    return translation[field] ?? '';
  }
}
