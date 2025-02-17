import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (!authService.isLoggedIn) {
    router.navigate(['/login']);
    return authService.isLoggedIn;
  }
  return authService.isLoggedIn;
};

export const notAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.isLoggedIn) {
    router.navigate(['/']);
    return false;
  }
  return true;
};
