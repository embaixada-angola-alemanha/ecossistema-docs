import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

/**
 * HTTP error interceptor that normalizes error responses.
 * Logs errors to console and re-throws for downstream handling.
 *
 * Usage in app.config.ts:
 *   provideHttpClient(withInterceptors([errorInterceptor]))
 */
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('[ApiClient] Unauthorized — token may have expired');
      } else if (error.status === 403) {
        console.warn('[ApiClient] Forbidden — insufficient permissions');
      } else if (error.status >= 500) {
        console.error('[ApiClient] Server error:', error.status, error.message);
      }

      return throwError(() => error);
    })
  );
};
