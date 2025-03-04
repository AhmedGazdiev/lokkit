import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserComponent } from '@/app/features/user/components/user/user.component';
import { UserService } from '@/app/core/services/user.service';
import { User } from '@/app/core/models/user';

@Component({
  selector: 'app-users',
  imports: [NgFor, UserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public userService = inject(UserService);

  updateUser(id: number): void {
    const updatedUser: User = {
      _id: id,
      fullName: 'Usman Gazdiev',
      username: '@usm_gaz',
      email: 'usman@mail.com',
      avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
      gender: 'male',
      role: 'user'
    };

    this.userService.updateUser(id, updatedUser);
    console.log(this.userService.users);
  }

  switchUser(id: number): void {
    this.userService.switchUser(id);
  }
}
