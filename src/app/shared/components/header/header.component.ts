import { Component, inject } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { DropDownItem } from '../drop-down/drop-down.type';
import { UserService } from '@/app/core/services/user.service';
import { AuthService } from '@/app/core/services/auth.service';

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
            link: `/profile/${this.userService.activeUser?._id}`
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
