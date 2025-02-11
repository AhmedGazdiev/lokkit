import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { EmptyComponent } from './features/pages/empty/empty.component';
import { LoginComponent } from './features/pages/login/login.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { FeedLayoutComponent } from './shared/components/feed-layout/feed-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    // children: [{ path: 'info' }, { path: 'posts' }, { path: 'favorites' }],
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./features/pages/users/users.component').then(
        (u) => u.UsersComponent
      ),
  },
  { path: 'feed', component: FeedLayoutComponent },
  { path: '**', component: EmptyComponent },
];

// component: UsersComponent
