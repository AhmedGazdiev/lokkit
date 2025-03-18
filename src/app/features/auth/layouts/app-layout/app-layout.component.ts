import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';

@Component({
    selector: 'app-layout',
    imports: [RouterOutlet, HeaderComponent, SidebarComponent],
    templateUrl: './app-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppLayoutComponent {}
