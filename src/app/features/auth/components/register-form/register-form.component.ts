import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { User } from '@core/models/user';
import { AuthService } from '@core/services';
import { confirmPassword, email, maxLength, minLength, required } from '@shared/validators';

@Component({
    selector: 'register-form',
    imports: [MatInput, MatFormField, MatLabel, MatButton, ReactiveFormsModule, RouterLink],
    templateUrl: './register-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
    private authService = inject(AuthService);

    public registerForm = new FormGroup(
        {
            fullname: new FormControl('', [required, minLength(6)]),
            username: new FormControl('', [required, minLength(3)]),
            email: new FormControl('', [required, email]),
            password: new FormControl('', [required, minLength(6), maxLength(16)]),
            confirmPassword: new FormControl('', required)
        },
        { validators: confirmPassword }
    );

    get fullnameControl() {
        return this.registerForm.get(['fullname']);
    }
    get usernameControl() {
        return this.registerForm.get(['username']);
    }
    get emailControl() {
        return this.registerForm.get(['email']);
    }
    get passwordControl() {
        return this.registerForm.get(['password']);
    }
    get confirmPasswordControl() {
        return this.registerForm.get(['confirmPassword']);
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.register(this.registerForm.value as User).subscribe();
        }
    }
}
