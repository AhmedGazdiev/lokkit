import { Component, inject } from '@angular/core';
import { DropDownComponent } from '../drop-down/drop-down.component';
import { IconComponent } from '../icon/icon.component';
import { UserService } from './../../../core/services/user.service';

@Component({
  selector: 'app-header',
  imports: [IconComponent, DropDownComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public userService = inject(UserService);
}
