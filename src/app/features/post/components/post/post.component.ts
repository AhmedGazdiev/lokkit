import { ChangeDetectionStrategy, Component, inject, input, OnInit, signal } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { CarouselComponent, IconComponent } from '@shared/components';
import { ShowIfLikedDirective } from '@shared/directives';
import { MenuItem } from '@shared/menu-item.type';
import { UsernamePipe } from '@shared/pipes';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { CommentComponent } from '../comment/comment.component';
import { LikeBtnComponent } from '../like-btn/like-btn.component';
import { SaveBtnComponent } from '../save-btn/save-btn.component';

@Component({
    selector: 'post',
    imports: [
        CarouselComponent,
        IconComponent,
        UsernamePipe,
        ShowIfLikedDirective,
        MatMenuModule,
        RouterLink,
        LikeBtnComponent,
        CommentFormComponent,
        CommentComponent,
        SaveBtnComponent
    ],
    templateUrl: './post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
    public readonly post = input.required<Post>({ alias: 'post' });
    public _showComments = signal<boolean>(false);
    private postService = inject(PostService);

    public toggleComments() {
        this._showComments.set(!this._showComments());
    }

    public menuItems: MenuItem[] = [];

    ngOnInit(): void {
        this.menuItems = [
            {
                label: 'Detail',
                link: ['/post', this.post()._id, 'detail']
            },
            {
                label: 'Edit',
                link: ['/post', this.post()._id, 'edit']
            },
            {
                label: 'Delete',
                click: () => this.postService.deletePost(this.post()._id).subscribe()
            }
        ];
    }
}
