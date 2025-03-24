import { Routes } from '@angular/router';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { DetailPostComponent } from './pages/detail-post/detail-post.component';
import { EditPostComponent } from './pages/edit-post/edit-post.component';

export const POST_ROUTES: Routes = [
    { path: 'create', title: 'Create Post', component: CreatePostComponent },
    { path: ':id/detail', title: 'Detail Post', component: DetailPostComponent },
    { path: ':id/edit', title: 'Edit Post', component: EditPostComponent }
];
