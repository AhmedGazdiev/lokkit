import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostService } from '@core/services/post.service';
import { PostComponent } from '@features/post/components/post/post.component';
import { SuggestionsComponent } from '@shared/components/suggestions/suggestions.component';

@Component({
    selector: 'app-feed',
    imports: [PostComponent, SuggestionsComponent, AsyncPipe],
    templateUrl: './feed.component.html',
    styleUrl: './feed.component.scss'
})
export class FeedComponent {
    public postService = inject(PostService);
    public posts$ = this.postService.posts$;

    ngOnInit(): void {
        this.postService.getPosts().subscribe();
    }

    like(id: number) {
        this.postService.likePost(id);
    }
}
