import { Component, inject } from '@angular/core';
import { PostComponent } from '@/app/features/post/components/post/post.component';
import { SuggestionsComponent } from '@/app/shared/components/suggestions/suggestions.component';
import { PostService } from '@/app/core/services/post.service';

@Component({
    selector: 'app-feed',
    imports: [PostComponent, SuggestionsComponent],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss'
})
export class FeedComponent {
    public postService = inject(PostService);

    like(id: number) {
        this.postService.likePost(id);
    }
}
