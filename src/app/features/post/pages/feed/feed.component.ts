import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'feed',
  imports: [],
  templateUrl: './feed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedComponent {}
