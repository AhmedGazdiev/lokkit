import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Comment } from '@core/models/comment';
import { UsernamePipe } from '@shared/pipes';

@Component({
    selector: 'comment',
    imports: [UsernamePipe],
    templateUrl: './comment.component.html',
    styles: ':host { width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent {
    public readonly comment = input.required<Comment>();
}
