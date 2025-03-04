import { Routes } from '@angular/router';
import { CreatePostComponent } from '@features/post/pages/create-post/create-post.component';
import { DetailPostComponent } from '@features/post/pages/detail-post/detail-post.component';
import { EditPostComponent } from '@features/post/pages/edit-post/edit-post.component';

export const postRoutes: Routes = [
    { path: 'new', title: 'Create Post', component: CreatePostComponent },
    { path: ':id/detail', title: 'Detail Post', component: DetailPostComponent },
    { path: ':id/edit', title: 'Edit Post', component: EditPostComponent }
];
