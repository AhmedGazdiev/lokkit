import { Routes } from '@angular/router';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { UsersComponent } from './features/pages/users/users.component';
import { FeedComponent } from './features/pages/feed/feed.component';
import { EmptyComponent } from './features/pages/empty/empty.component';

export const routes: Routes = [
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'feed', component: FeedComponent },
  { path: '**', component: EmptyComponent },
];
