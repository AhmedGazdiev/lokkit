import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services';
import { MenuItem } from '@shared/menu-item.type';
import { IconComponent } from '../icon/icon.component';

@Component({
    selector: 'app-header',
    imports: [IconComponent, MatFormField, MatLabel, MatInput, MatButton, RouterLink, MatMenuModule],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    public authService = inject(AuthService);
    public menuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Profile',
                link: `/profile/${this.authService.authData()?._id}`
            },
            {
                label: 'Settings',
                link: `/profile/${this.authService.authData()?._id}/settings`
            },
            {
                label: 'Logout',
                click: () => this.authService.logout().subscribe()
            }
        ];
    }
}
