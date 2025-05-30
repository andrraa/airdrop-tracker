import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const session = await authService.session();

    if (session) {
      return true;
    } else {
      router.navigate(['auth/login']);
      return false;
    }
  } catch (error) {
    router.navigate(['auth/login']);
    return false;
  }
};
