import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'auth-layout',
    imports: [RouterOutlet],
    templateUrl: './auth-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthLayoutComponent {}
