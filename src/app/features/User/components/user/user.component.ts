import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsernamePipe } from '@/app/shared/pipes/username.pipe';
import { User } from '@/app/core/models/user';

@Component({
    selector: 'app-user',
    imports: [UsernamePipe],
    templateUrl: './user.component.html',
    styleUrl: './user.component.scss'
})
export class UserComponent {
    @Input() user!: User;
    @Output() update = new EventEmitter();

    updateUser(id: number) {
        this.update.emit(id);
    }
}
