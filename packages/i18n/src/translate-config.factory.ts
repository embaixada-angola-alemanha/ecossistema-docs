import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Factory for ngx-translate HttpLoader.
 * Usage in app.config.ts:
 *   importProvidersFrom(TranslateModule.forRoot({
 *     defaultLanguage: 'pt',
 *     loader: { provide: TranslateLoader, useFactory: translateLoaderFactory, deps: [HttpClient] }
 *   }))
 */
export function translateLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
