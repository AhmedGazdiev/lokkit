import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { IconComponent } from '../../../../shared/components/icon/icon.component';
import { CutTextPipe } from '../../../../shared/pipes/cut-text.pipe';

@Component({
  selector: 'app-post',
  imports: [IconComponent, NgIf, CutTextPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  @Input() post!: Post;
  @Output() likeFn = new EventEmitter();

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
