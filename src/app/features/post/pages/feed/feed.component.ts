import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostService } from '@core/services/post.service';

@Component({
    selector: 'feed',
    imports: [AsyncPipe],
    templateUrl: './feed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {
    private postService = inject(PostService);
    public posts$ = this.postService.posts$;

    ngOnInit(): void {
        this.postService.getPosts().subscribe();
    }
}
