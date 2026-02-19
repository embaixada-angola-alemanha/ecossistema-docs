import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const AuthGuard: CanActivateFn = async (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    await authService.login();
    return false;
  }

  const requiredRoles = route.data?.['roles'] as string[] | undefined;
  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequired = requiredRoles.some(role => authService.hasRole(role));
    if (!hasRequired) {
      router.navigate(['/unauthorized']);
      return false;
    }
  }

  return true;
};
