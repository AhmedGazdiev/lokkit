import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { EmptyComponent } from './features/pages/empty/empty.component';
import { FeedComponent } from './features/pages/feed/feed.component';
import { LoginComponent } from './features/pages/login/login.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { RegisterComponent } from './features/pages/register/register.component';
import { UsersComponent } from './features/pages/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard],
    // children: [{ path: 'info' }, { path: 'posts' }, { path: 'favorites' }],
  },
  { path: 'users', component: UsersComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', component: EmptyComponent },
];
