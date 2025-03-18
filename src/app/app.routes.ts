import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from '@core/guards';
import { AppLayoutComponent, AuthLayoutComponent, LoginComponent, RegisterComponent } from '@features/auth';
import { FeedComponent } from '@features/post';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        canActivate: [notAuthGuard],
        children: [
            { path: 'login', title: 'Login', component: LoginComponent },
            { path: 'register', title: 'Register', component: RegisterComponent },
            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },
    {
        path: '',
        component: AppLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: 'feed', component: FeedComponent },
            { path: '', redirectTo: 'feed', pathMatch: 'full' }
        ]
    }
];
