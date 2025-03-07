import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const localStorageService = inject(LocalStorageService);
    const token = localStorageService.get('token');
    req = req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });

    return next(req);
};
