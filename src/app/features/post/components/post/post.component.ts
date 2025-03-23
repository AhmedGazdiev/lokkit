import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Post } from '@core/models/post';

@Component({
    selector: 'post',
    imports: [],
    templateUrl: './post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
    public readonly post = input.required<Post>({ alias: 'post' });
}
