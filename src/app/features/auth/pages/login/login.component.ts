import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoginRequest } from '@core/models/auth';
import { AuthService } from '@core/services';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
    selector: 'login',
    imports: [LoginFormComponent],
    templateUrl: './login.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    private readonly authService = inject(AuthService);
    public authLoading = this.authService.loading$;

    onLogin(data: LoginRequest) {
        this.authService.login(data).subscribe();
    }
}
