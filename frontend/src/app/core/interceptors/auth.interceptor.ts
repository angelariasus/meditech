import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip adding token for auth endpoints (login/refresh)
  if (req.url.includes('/api/auth/login') || req.url.includes('/api/auth/refresh')) {
    return next(req);
  }

  const token = localStorage.getItem('meditech_token');
  
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(cloned);
  }
  
  return next(req);
};
