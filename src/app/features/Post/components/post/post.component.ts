import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IconComponent } from '@shared/components/icon/icon.component';
import { CutTextPipe } from '@shared/pipes/cut-text.pipe';
import { UsernamePipe } from '@shared/pipes/username.pipe';
import { DropDownComponent } from '@shared/components/drop-down/drop-down.component';
import { ShowIfLikedDirective } from '@shared/directives/show-if-liked.directive';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { DropDownItem } from '@shared/components/drop-down/drop-down.type';

@Component({
    selector: 'app-post',
    imports: [IconComponent, NgIf, CutTextPipe, UsernamePipe, DropDownComponent, ShowIfLikedDirective],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
    @Input() post!: Post;
    @Output() likeFn = new EventEmitter();
    private postService = inject(PostService);

    public dropDownItems: DropDownItem[] = [];

    ngOnInit() {
        this.dropDownItems = [
            {
                label: 'Detail',
                link: ['/post', this.post?._id, 'detail']
            },
            {
                label: 'Edit',
                link: ['/post', this.post?._id, 'edit']
            },
            {
                label: 'Delete',
                click: () => this.postService.deletePost()
            }
        ];
    }

    likePost(id: any) {
        this.likeFn.emit(id);
    }

    private _showComments: boolean = false;

    get showComments(): boolean {
        return this._showComments;
    }

    toggleComments(): void {
        this._showComments = !this._showComments;
    }
}
