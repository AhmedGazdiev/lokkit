import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsernamePipe } from '@shared/pipes/username.pipe';
import { User } from '@core/models/user';

@Component({
    selector: 'app-user',
    imports: [UsernamePipe],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {
    @Input() user!: User;
}
