import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@core/services/user.service';
import { DropDownComponent } from '@shared/components/drop-down/drop-down.component';
import { DropDownItem } from '@shared/components/drop-down/drop-down.type';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
    selector: 'app-header',
    imports: [IconComponent, DropDownComponent, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent {
    public userService = inject(UserService);
    public authService = inject(AuthService);

    public dropDownItems: DropDownItem[] = [
        {
            label: 'Profile',
            link: `/profile/${this.userService.activeUser$.value?.id}`
        },
        {
            label: 'Settings',
            link: '/settings'
        },
        {
            label: 'Logout',
            click: () => this.authService.logout()
        }
    ];
}
