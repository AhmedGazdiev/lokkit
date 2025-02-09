import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-user',
  imports: [],
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
