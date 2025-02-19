import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {InputComponent} from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-create-post-form',
  imports: [
    FormsModule,
    IconComponent,
    ReactiveFormsModule,InputComponent
  ],
  templateUrl: './create-post-form.component.html',
  styleUrl: './create-post-form.component.scss'
})
export class CreatePostFormComponent {

}
