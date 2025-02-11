import { Component } from '@angular/core';
import { FeedComponent } from '../../../features/pages/feed/feed.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SideRightComponent } from '../side-right/side-right.component';

@Component({
  selector: 'app-feed-layout',
  imports: [FeedComponent, SidebarComponent, SideRightComponent],
  templateUrl: './feed-layout.component.html',
  styleUrl: './feed-layout.component.scss',
})
export class FeedLayoutComponent {}
