import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const accessToken = localStorage.getItem('access_token');

  const clonedReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(clonedReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((res) => {
            const newToken = res.data?.accessToken;

            if (!newToken) {
              clearUserData();
              router.navigate(['/auth/sign-in']);
              return throwError(() => error);
            }

            localStorage.setItem('access_token', newToken);

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`,
              },
            });

            return next(retryReq);
          }),
          catchError(() => {
            clearUserData();
            router.navigate(['/auth/sign-in']);
            return throwError(() => error);
          })
        );
      }

      clearUserData();
      router.navigate(['/auth/sign-in']);
      return throwError(() => error);
    })
  );
};

function clearUserData() {
  localStorage.clear();
}
