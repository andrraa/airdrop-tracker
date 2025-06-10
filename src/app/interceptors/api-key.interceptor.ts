import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  const apiKey = environment.api_key;

  const cloned = req.clone({
    headers: req.headers.set('X-API-KEY', apiKey),
  });

  return next(cloned);
};
