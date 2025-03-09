import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@core/models/user';
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
    activeUser = signal<User | null>(null);

    constructor() {
        this.userService.activeUser$.subscribe(user => {
            this.activeUser.set(user);
        });
    }

    public dropDownItems: DropDownItem[] = [
        {
            label: 'Profile',
            link: `/profile/${this.activeUser()?.id}`
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
