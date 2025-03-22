import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '@core/services/local-storage.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const storage = inject(LocalStorageService);

    const token = storage.get('token');
    const isCloud = req.url.includes('https://api.cloudinary.com');

    if (isCloud) {
        return next(req);
    }

    if (token) {
        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });
    }

    return next(req);
};
