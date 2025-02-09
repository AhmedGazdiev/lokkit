import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../../core/models/post';
import { CutTextPipe } from '../../pipes/cut-text.pipe';
import { IconComponent } from '../icon/icon.component';
import { ShowIfLikedDirective } from './../../directives/show-if-liked.directive';

@Component({
  selector: 'app-post',
  imports: [IconComponent, NgIf, CutTextPipe, ShowIfLikedDirective],
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
