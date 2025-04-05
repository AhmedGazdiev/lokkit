import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Comment } from '@core/models/comment';
import { PostService } from '@core/services/post.service';
import { MenuItem } from '@shared/menu-item.type';
import { UsernamePipe } from '@shared/pipes';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'comment',
    imports: [UsernamePipe, MatMenuModule, IconComponent],
    templateUrl: './comment.component.html',
    styles: ':host { width: 100%; }',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentComponent implements OnInit {
    public readonly comment = input.required<Comment>();
    private readonly postService = inject(PostService);

    public commentMenuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.commentMenuItems = [
            {
                label: 'Delete',
                click: () => this.postService.deleteComment(this.comment()._id).subscribe()
            }
        ];
    }
}
