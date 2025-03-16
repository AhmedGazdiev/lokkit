import { Routes } from '@angular/router';
import { FeedComponent } from '@features/post';

export const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: '', redirectTo: 'feed', pathMatch: 'full' },
];
