import { Component, inject } from '@angular/core';
import { InfoFormComponent } from '@features/profile/components/info-form/info-form.component';
import { PasswordFormComponent } from '@features/profile/components/password-form/password-form.component';
import { UserService } from '@core/services/user.service';

@Component({
    selector: 'app-info',
    imports: [InfoFormComponent, PasswordFormComponent],
    templateUrl: './info.component.html',
    styleUrl: './info.component.scss'
})
export class InfoComponent {
    public userService = inject(UserService);
}
