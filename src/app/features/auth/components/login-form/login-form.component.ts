import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { AuthService } from '@core/services';
import { email, maxLength, minLength, required } from '@shared/validators';

@Component({
    selector: 'login-form',
    imports: [MatInput, MatFormField, MatLabel, MatButton, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);

    public loginForm = this.fb.group({
        email: this.fb.control('', [required, email]),
        password: this.fb.control('', [required, minLength(6), maxLength(16)])
    });

    get emailControl() {
        return this.loginForm.get(['email']);
    }
    get passwordControl() {
        return this.loginForm.get(['password']);
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value as User).subscribe();
            this.router.navigate(['/feed']);
        }
    }
}
