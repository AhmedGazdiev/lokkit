import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {IconComponent} from '../../../../shared/components/icon/icon.component';

@Component({
  selector: 'app-login-form',
  imports: [
    IconComponent,
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4),Validators.maxLength(16)])
  });

  public onSubmit() {
    if (this.loginForm.valid) {
      console.log('данные пользователя:', this.loginForm.value);
    }
  }
}
