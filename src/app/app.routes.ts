import { Routes } from '@angular/router';
import { authGuard, notAuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './features/Auth/layouts/auth-layout/auth-layout.component';
import { NotAuthLayoutComponent } from './features/Auth/layouts/not-auth-layout/not-auth-layout.component';
import { LoginComponent } from './features/Auth/pages/login/login.component';
import { RegisterComponent } from './features/Auth/pages/register/register.component';
import { EmptyComponent } from './features/pages/empty/empty.component';
import { FeedComponent } from './features/Post/pages/feed/feed.component';
import { ProfileComponent } from './features/Profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'feed', pathMatch: 'full' },
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/Profile/profile.routes').then(
            (p) => p.profileRoutes
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/User/pages/users/users.component').then(
            (u) => u.UsersComponent
          ),
      },
      { path: 'feed', component: FeedComponent },
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
