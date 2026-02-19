import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from './language.service';

/**
 * Pipe for field-suffix localization pattern.
 * Usage: {{ article | localized:'titulo' }}
 * Reads article.tituloPt / tituloEn / tituloDe / tituloCs based on current language.
 */
@Pipe({ name: 'localized', standalone: true, pure: false })
export class LocalizedPipe implements PipeTransform {

  private readonly langService = inject(LanguageService);

  transform(obj: Record<string, unknown> | null | undefined, fieldBase: string): string {
    if (!obj) return '';
    return this.langService.getLocalizedField(obj, fieldBase);
  }
}
