import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    console.log('Guard allowed');
    return true;
  }
  else {
    console.log('Guard denied');
    router.navigate(['/login']);
    return false;
  }
};
