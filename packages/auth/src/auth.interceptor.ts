import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { from, switchMap } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    return next(req);
  }

  // Skip auth header for public API calls
  if (req.url.includes('/public/') || req.url.includes('/feed/')) {
    return next(req);
  }

  return from(authService.getToken()).pipe(
    switchMap(token => {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next(authReq);
    })
  );
};
