import {Routes} from '@angular/router';
import {CreatePostComponent} from './pages/create-post/create-post.component';
import {DetailPostComponent} from './pages/detail-post/detail-post.component';
import {EditPostComponent} from './pages/edit-post/edit-post.component';

export const postRoutes: Routes = [
  {path: 'new', title:'Create Post', component: CreatePostComponent},
  {path: ':id/detail', title:'Detail Post', component: DetailPostComponent},
  {path: ':id/edit', title:'Edit Post', component: EditPostComponent}
]
