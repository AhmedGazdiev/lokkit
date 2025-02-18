import {Component, inject} from '@angular/core';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../../../core/services/auth.service';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../password.validator';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-register-form',
  imports: [
    IconComponent, RouterLink, ReactiveFormsModule, NgIf
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  private authService = inject(AuthService)
  private fb = inject(FormBuilder)

  registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]

  }, {validators: passwordMatchValidator})

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('Form data:', this.registerForm.value);
    }
  }
}
