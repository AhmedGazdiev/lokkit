import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-edit-post-form',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss'
})
export class EditPostFormComponent {
}
