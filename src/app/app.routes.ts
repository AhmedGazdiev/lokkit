import {Routes} from '@angular/router';
import {authGuard, notAuthGuard} from './core/guards/auth.guard';
import {AuthLayoutComponent} from './features/auth/layouts/auth-layout/auth-layout.component';
import {NotAuthLayoutComponent} from './features/auth/layouts/not-auth-layout/not-auth-layout.component';
import {LoginComponent} from './features/auth/pages/login/login.component';
import {RegisterComponent} from './features/auth/pages/register/register.component';
import {NotFoundComponent} from './features/not-found/pages/not-found/not-found.component';
import {FeedComponent} from './features/post/pages/feed/feed.component';
import {ProfileComponent} from './features/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {path: '', redirectTo: 'feed', pathMatch: 'full'},
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [authGuard],
        loadChildren: () =>
          import('./features/profile/profile.routes').then(
            (p) => p.profileRoutes
          ),
      },
      {
        path: 'post',
        loadChildren: () => import('./features/post/post.routes').then(
          (p) => p.postRoutes
        )
      },

      {
        path: 'users',
        loadComponent: () =>
          import('./features/user/pages/users/users.component').then(
            (u) => u.UsersComponent
          ),
      },
      {
        path: 'feed',
        component: FeedComponent
      },
    ],
  },
  {
    path: '',
    component: NotAuthLayoutComponent,
    canActivate: [notAuthGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: '', redirectTo: 'login', pathMatch: 'full'},
    ],
  },
  {path: '**', component: NotFoundComponent},
];
