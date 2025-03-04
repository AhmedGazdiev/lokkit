import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '@/app/core/services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    if (!userService.activeUser?.role || userService.activeUser?.role !== 'admin') {
        router.navigate(['/feed']);
        return true;
    }
    return false;
};
