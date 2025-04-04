import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Comment } from '@core/models/comment';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { maxLength, required } from '@shared/validators';
import { IconComponent } from '../../../../shared/components/icon/icon.component';

@Component({
    selector: 'comment-form',
    imports: [MatFormField, MatLabel, MatInput, MatMenuModule, IconComponent, ReactiveFormsModule],
    templateUrl: './comment-form.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent {
    public readonly post = input.required<Post>();
    public readonly reply = input.required<string>();
    private readonly fb = inject(FormBuilder);
    private readonly postService = inject(PostService);

    public commentForm = this.fb.group({
        content: this.fb.control('', [required, maxLength(200)])
    });

    get content() {
        return this.commentForm.get(['content']);
    }

    onSubmit() {
        const data: Partial<Comment> = {
            postId: this.post()._id,
            content: this.content?.value,
            reply: this.reply(),
            postUserId: this.post().user._id
        };

        console.log(data);
        if (this.commentForm.valid) {
            this.postService.createComment(data).subscribe();
        }
    }
}
