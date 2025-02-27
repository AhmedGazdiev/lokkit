import {Component} from '@angular/core';
import {InputComponent} from "../../../../shared/components/input/input.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-info-form',
  imports: [
    InputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './info-form.component.html',
  styleUrl: './info-form.component.scss'
})
export class InfoFormComponent {

  public profileInfoForm = new FormGroup({
    fullName: new FormControl(
      '',
      [Validators.required, Validators.minLength(4)]
    ),
    username: new FormControl(
      '',
      [Validators.required]
    ),
    city: new FormControl(''),
    story: new FormControl(
      '',
      [Validators.maxLength(200)]
    ),
  })

  public onSubmit() {
    if (this.profileInfoForm.valid) {
      this.profileInfoForm.patchValue({
        fullName: 'John Wick',
        username: 'john_w',
        city: 'Los-Angeles',
        story: 'I\'ve killed all my enemies.'
      })

      console.log('Successfully updated profileInfo:', this.profileInfoForm.value);
    }
  }
}

