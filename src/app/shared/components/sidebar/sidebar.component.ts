import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { IconComponent } from '@shared/components/icon/icon.component';

@Component({
    selector: 'app-sidebar',
    imports: [IconComponent, RouterLink],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
    public userService = inject(UserService);
    activeUser = signal<User | null>(null);

    constructor() {
        this.userService.activeUser$.subscribe(user => {
            this.activeUser.set(user);
        });
    }
}
