import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { UserComponent } from '@features/user/components/user/user.component';

@Component({
    selector: 'app-users',
    imports: [UserComponent, AsyncPipe],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
    private userService = inject(UserService);
    public users$ = this.userService.users$;

    ngOnInit(): void {
        this.userService.getUsers().subscribe();
    }

    updateUser(id: number): void {
        const updatedUser: User = {
            id: id,
            fullName: 'Usman Gazdiev',
            username: '@usm_gaz',
            email: 'usman@mail.com',
            avatar: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png',
            gender: 'male',
            role: 'user'
        };

        this.userService.updateUser(id, updatedUser);
    }
}
