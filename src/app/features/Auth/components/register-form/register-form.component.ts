import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@/app/core/services/auth.service';
import { IconComponent } from '@/app/shared/components/icon/icon.component';
import { passwordMatchValidator } from '@/app/features/auth/password.validator';

@Component({
    selector: 'app-register-form',
    imports: [IconComponent, RouterLink, ReactiveFormsModule],
    templateUrl: './register-form.component.html',
    styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
    private authService = inject(AuthService);
    private fb = inject(FormBuilder);

    registerForm = this.fb.group(
        {
            email: ['', [Validators.email, Validators.required]],
            username: ['', [Validators.required, Validators.minLength(4)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', [Validators.required]]
        },
        { validators: passwordMatchValidator }
    );

    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value);
        }
    }
}
