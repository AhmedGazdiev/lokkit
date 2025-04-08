import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LoginRequest } from '@core/models/auth';
import { email, maxLength, minLength, required } from '@shared/validators';
import { Observable } from 'rxjs';

@Component({
    selector: 'login-form',
    imports: [
        MatInput,
        MatFormField,
        MatLabel,
        MatButton,
        ReactiveFormsModule,
        RouterLink,
        MatProgressBarModule,
        AsyncPipe
    ],
    templateUrl: './login-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
    @Input() isLoading!: Observable<boolean>;
    @Output() login = new EventEmitter<LoginRequest>();
    private fb = inject(FormBuilder);

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
            this.login.emit(this.loginForm.value as LoginRequest);
        }
    }
}
