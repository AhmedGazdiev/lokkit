import {Component} from '@angular/core';
import {CreatePostFormComponent} from '../../components/create-post-form/create-post-form.component';

@Component({
  selector: 'app-create-post',
  imports: [
    CreatePostFormComponent
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {

}
