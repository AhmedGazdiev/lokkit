import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '@core/services';
import { IconComponent } from '../icon/icon.component';
import { RouterLink } from '@angular/router';
import { iconTypes } from '@shared/types';

interface ItemsList {
    title: string;
    icon: iconTypes;
    link: string;
}

@Component({
    selector: 'sidebar',
    imports: [IconComponent, MatFormField, MatLabel, MatInput, RouterLink],
    templateUrl: './sidebar.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
    public authService = inject(AuthService);

    public itemsList: ItemsList[] = [
        {
            title: 'Home',
            icon: 'home',
            link: '/'
        },
        {
            title: 'Tasks',
            icon: 'tasks',
            link: 'tasks'
        },
        {
            title: 'Users',
            icon: 'users',
            link: 'users'
        },
        {
            title: "API's",
            icon: 'cube',
            link: 'apis'
        },
        {
            title: 'Subscriptions',
            icon: 'creditCard',
            link: 'subscriptions'
        },
        {
            title: 'Settings',
            icon: 'settingsLight',
            link: `/profile/${this.authService.authData.value?._id}/settings`
        },
        {
            title: 'Help & Support',
            icon: 'helpSupportLight',
            link: 'support'
        }
    ];

    public logout() {
        this.authService.logout().subscribe();
    }
}
