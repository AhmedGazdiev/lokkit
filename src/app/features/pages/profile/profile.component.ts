import { Component, inject } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  public userService = inject(UserService);
}
