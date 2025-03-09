import { Component, inject, signal } from '@angular/core';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { InfoFormComponent } from '@features/profile/components/info-form/info-form.component';
import { PasswordFormComponent } from '@features/profile/components/password-form/password-form.component';

@Component({
    selector: 'app-info',
    imports: [InfoFormComponent, PasswordFormComponent],
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss'
})
export class InfoComponent {
    public userService = inject(UserService);
    activeUser = signal<User | null>(null);

    constructor() {
        this.userService.activeUser$.subscribe(user => {
            this.activeUser.set(user);
        });
    }
}
