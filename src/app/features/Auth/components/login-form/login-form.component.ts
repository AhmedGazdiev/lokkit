import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
    selector: 'app-login-form',
    imports: [IconComponent, RouterLink, ReactiveFormsModule],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
    private authService = inject(AuthService);

    public loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)])
    });

    public onSubmit() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value);
        }
    }
}
