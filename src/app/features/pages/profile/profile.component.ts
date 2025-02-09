import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public userService = inject(UserService);
}
