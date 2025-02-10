import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { EmptyComponent } from './features/pages/empty/empty.component';
import { FeedComponent } from './features/pages/feed/feed.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { UsersComponent } from './features/pages/users/users.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'users', component: UsersComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', component: EmptyComponent },
];
