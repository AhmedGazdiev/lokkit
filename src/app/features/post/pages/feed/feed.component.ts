import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostService } from '@core/services/post.service';
import { PostComponent } from '../../components/post/post.component';

@Component({
    selector: 'feed',
    imports: [AsyncPipe, PostComponent],
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
