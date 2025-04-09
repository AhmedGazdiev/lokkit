import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '@core/services';

@Component({
    selector: 'saved',
    imports: [],
    templateUrl: './saved.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedComponent {
    public readonly authService = inject(AuthService);
}
