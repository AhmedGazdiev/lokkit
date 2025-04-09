import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@core/services';
import { UserService } from '@core/services/user.service';

@Component({
    selector: 'saved',
    imports: [],
    templateUrl: './saved.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedComponent {
    public readonly authService = inject(AuthService);
    public readonly userService = inject(UserService);
    public userData = toSignal(this.userService.user$, { initialValue: null });
}
