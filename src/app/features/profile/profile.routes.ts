import { Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/posts.component';
import { SavedComponent } from './pages/saved/saved.component';
import { TaggedComponent } from './pages/tagged/tagged.component';

export const PROFILE_ROUTES: Routes = [
    { path: 'posts', title: 'User Posts', component: PostsComponent },
    { path: 'tagged', title: 'User Tagged', component: TaggedComponent },
    { path: 'saved', title: 'User Saved', component: SavedComponent },
    { path: '', redirectTo: 'posts', pathMatch: 'full' }
];
