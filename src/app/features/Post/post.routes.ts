import {Routes} from '@angular/router';
import {CreatePostComponent} from './pages/create-post/create-post.component';
import {DetailPostComponent} from './pages/detail-post/detail-post.component';
import {EditPostComponent} from './pages/edit-post/edit-post.component';

export const postRoutes: Routes = [
  {path: 'new', component: CreatePostComponent},
  {path: ':id/detail', component: DetailPostComponent},
  {path: ':id/edit', component: EditPostComponent}
]
