import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { IconComponent } from '@/app/shared/components/icon/icon.component';
import { CutTextPipe } from '@/app/shared/pipes/cut-text.pipe';
import { UsernamePipe } from '@/app/shared/pipes/username.pipe';
import { DropDownComponent } from '@/app/shared/components/drop-down/drop-down.component';
import { ShowIfLikedDirective } from '@/app/shared/directives/show-if-liked.directive';
import { PostService } from '@/app/core/services/post.service';
import { Post } from '@/app/core/models/post';
import { DropDownItem } from '@/app/shared/components/drop-down/drop-down.type';

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
        // link: `/post/${this.post?._id}/detail`,
        link: ['/post', this.post?._id, 'detail']
      },
      {
        label: 'Edit',
        // link: `/post/${this.post?._id}/edit`,
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
