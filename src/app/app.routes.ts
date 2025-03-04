import { Routes } from '@angular/router';
import { AuthLayoutComponent } from '@/app/features/auth/layouts/auth-layout/auth-layout.component';
import { authGuard, notAuthGuard } from '@/app/core/guards/auth.guard';
import { ProfileComponent } from '@/app/features/profile/profile.component';
import { FeedComponent } from '@/app/features/post/pages/feed/feed.component';
import { NotAuthLayoutComponent } from '@/app/features/auth/layouts/not-auth-layout/not-auth-layout.component';
import { LoginComponent } from '@/app/features/auth/pages/login/login.component';
import { RegisterComponent } from '@/app/features/auth/pages/register/register.component';
import { NotFoundComponent } from '@/app/features/not-found/pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'feed', pathMatch: 'full' },
            {
                path: 'profile/:id',
                title: 'Profile',
                component: ProfileComponent,
                canActivate: [authGuard],
                loadChildren: () => import('./features/profile/profile.routes').then(p => p.profileRoutes)
            },
            {
                path: 'post',
                loadChildren: () => import('./features/post/post.routes').then(p => p.postRoutes)
            },

            {
                path: 'users',
                title: 'Users',
                loadComponent: () => import('./features/user/pages/users/users.component').then(u => u.UsersComponent)
            },
            {
                path: 'feed',
                title: 'Feed Posts',
                component: FeedComponent
            }
        ]
    },
    {
        path: '',
        component: NotAuthLayoutComponent,
        canActivate: [notAuthGuard],
        children: [
            { path: 'login', title: 'Login', component: LoginComponent },
            { path: 'register', title: 'Register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    { path: '**', title: 'Page 404', component: NotFoundComponent }
];
