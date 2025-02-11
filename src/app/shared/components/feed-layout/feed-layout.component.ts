import { Component } from '@angular/core';
import { FeedComponent } from '../../../features/pages/feed/feed.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-feed-layout',
  imports: [FeedComponent, SidebarComponent],
  templateUrl: './feed-layout.component.html',
  styleUrl: './feed-layout.component.scss',
})
export class FeedLayoutComponent {}
