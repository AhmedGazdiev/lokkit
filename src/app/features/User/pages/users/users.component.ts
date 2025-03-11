import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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
}
