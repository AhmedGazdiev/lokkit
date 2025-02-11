import { Component, inject } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-header',
  imports: [IconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public userService = inject(UserService);
}
