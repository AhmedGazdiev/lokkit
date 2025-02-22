import {Component, inject} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {InputComponent} from '../../../../shared/components/input/input.component';
import {InfoFormComponent} from '../../components/info-form/info-form.component';
import {PasswordFormComponent} from '../../components/password-form/password-form.component';

@Component({
  selector: 'app-info',
  imports: [InputComponent, InfoFormComponent, PasswordFormComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  public userService = inject(UserService);
}
