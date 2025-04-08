import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { RegisterRequest } from '@core/models/auth';
import { confirmPassword, email, maxLength, minLength, required } from '@shared/validators';
import { Observable } from 'rxjs';

@Component({
    selector: 'register-form',
    imports: [
        MatInput,
        MatFormField,
        MatLabel,
        MatButton,
        ReactiveFormsModule,
        RouterLink,
        MatProgressBarModule,
        NgIf,
        AsyncPipe
    ],
    templateUrl: './register-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
    @Input() isLoading!: Observable<boolean>;
    @Output() register = new EventEmitter<RegisterRequest>();

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
            this.register.emit(this.registerForm.value as RegisterRequest);
        }
    }
}
