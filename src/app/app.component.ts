import { Component } from '@angular/core';
import { FeedComponent } from './features/pages/feed/feed.component';
import { ProfileComponent } from './features/pages/profile/profile.component';
import { UsersComponent } from './features/pages/users/users.component';

@Component({
  selector: 'app-root',
  imports: [ProfileComponent, UsersComponent, FeedComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
