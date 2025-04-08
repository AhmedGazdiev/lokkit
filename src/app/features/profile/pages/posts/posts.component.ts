import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'posts',
    imports: [],
    templateUrl: './posts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {}
