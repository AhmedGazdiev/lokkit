import {Component} from '@angular/core';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {InputComponent} from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-edit-post-form',
  imports: [
    IconComponent,
    InputComponent
  ],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.scss'
})
export class EditPostFormComponent {

}
