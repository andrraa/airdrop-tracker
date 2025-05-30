import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';

export const guestGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const session = await authService.session();

    if (session) {
      router.navigate(['']);
      return false;
    }

    return true;
  } catch (error) {
    return true;
  }
};
