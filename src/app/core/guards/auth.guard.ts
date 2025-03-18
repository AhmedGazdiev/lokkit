import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '@core/services/local-storage.service';

export const authGuard: CanActivateFn = (route, state) => {
    const storage = inject(LocalStorageService);
    const router = inject(Router);

    if (!storage.get('token')) {
        router.navigate(['/login']);
        return false;
    }
    return true;
};

export const notAuthGuard: CanActivateFn = (route, state) => {
    const storage = inject(LocalStorageService);
    const router = inject(Router);

    if (storage.get('token')) {
        router.navigate(['/feed']);
        return false;
    }
    return true;
};
