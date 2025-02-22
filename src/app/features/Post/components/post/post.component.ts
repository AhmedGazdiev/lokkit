import {NgIf} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Post} from '../../../../core/models/post';
import {IconComponent} from '../../../../shared/components/icon/icon.component';
import {CutTextPipe} from '../../../../shared/pipes/cut-text.pipe';
import {UsernamePipe} from '../../../../shared/pipes/username.pipe';
import {RouterLink} from '@angular/router';
import {DropDownItem} from '../../../../shared/components/drop-down/drop-down.type';
import {PostService} from '../../../../core/services/post.service';
import {DropDownComponent} from '../../../../shared/components/drop-down/drop-down.component';

@Component({
  selector: 'app-post',
  imports: [IconComponent, NgIf, CutTextPipe, UsernamePipe, RouterLink, DropDownComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
  @Output() likeFn = new EventEmitter();
  private postService = inject(PostService);

  public dropDownItems: DropDownItem[] = [
    {
      label: 'Edit',
      link: `/post/${this.post?._id}/edit`,
    },
    {
      label: 'Delete',
      click: () => this.postService.deletePost()
    }
  ];

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
