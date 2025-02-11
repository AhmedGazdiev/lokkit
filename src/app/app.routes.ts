import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './features/layouts/auth-layout/auth-layout.component';
import { NotAuthLayoutComponent } from './features/layouts/not-auth-layout/not-auth-layout.component';
import { EmptyComponent } from './features/pages/empty/empty.component';
import { LoginComponent } from './features/pages/login/login.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { FeedLayoutComponent } from './shared/components/feed-layout/feed-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/pages/users/users.component').then(
            (u) => u.UsersComponent
          ),
      },
      { path: 'feed', component: FeedLayoutComponent },
    ],
  },
  {
    path: '',
    component: NotAuthLayoutComponent,
    canActivate: [notAuthGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', component: EmptyComponent },
];

// component: UsersComponent
