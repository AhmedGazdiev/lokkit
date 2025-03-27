import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { PostService } from '@core/services/post.service';
import { IconComponent } from '@shared/components';

@Component({
    selector: 'like-btn',
    imports: [IconComponent],
    templateUrl: './like-btn.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeBtnComponent {
    public readonly id = input.required<string>();
    public readonly postService = inject(PostService);

    like() {
        this.postService.likePost(this.id()).subscribe();
    }
    unlike() {}
}
