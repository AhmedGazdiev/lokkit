import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../../../core/models/user';
import {UsernamePipe} from '../../../../shared/pipes/username.pipe';

@Component({
  selector: 'app-user',
  imports: [
    UsernamePipe
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  @Input() user!: User;
  @Output() update = new EventEmitter();

  updateUser(id: number) {
    this.update.emit(id);
  }
}
