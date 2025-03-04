import { Component, inject } from '@angular/core';
import { SuggestionsComponent } from '@shared/components/suggestions/suggestions.component';
import { PostComponent } from '@features/post/components/post/post.component';
import { PostService } from '@core/services/post.service';

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
