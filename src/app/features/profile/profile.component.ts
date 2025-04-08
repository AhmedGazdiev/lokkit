import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'profile',
    imports: [RouterOutlet],
    templateUrl: './profile.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {}
