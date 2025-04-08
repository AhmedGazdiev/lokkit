import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RegisterRequest } from '@core/models/auth';
import { AuthService } from '@core/services';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';

@Component({
    selector: 'register',
    imports: [RegisterFormComponent],
    templateUrl: './register.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
    private readonly authService = inject(AuthService);
    public authLoading = this.authService.loading$;

    onRegister(data: RegisterRequest) {
        this.authService.register(data).subscribe();
    }
}
