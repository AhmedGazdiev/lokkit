import {Component, inject} from '@angular/core';
import {UserService} from '../../../../core/services/user.service';
import {InputComponent} from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-info',
  imports: [InputComponent],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  public userService = inject(UserService);
}
