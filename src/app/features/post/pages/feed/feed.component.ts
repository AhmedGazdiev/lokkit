import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PostService } from '@core/services/post.service';
import { UserService } from '@core/services/user.service';
import { SuggestUserComponent } from '@shared/components/suggest-user/suggest-user.component';
import { PostComponent } from '../../components/post/post.component';

@Component({
    selector: 'feed',
    imports: [AsyncPipe, PostComponent, SuggestUserComponent],
    templateUrl: './feed.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit {
    private postService = inject(PostService);
    private userService = inject(UserService);
    public posts$ = this.postService.posts$;
    public suggests$ = this.userService.suggestUsers$;

    ngOnInit(): void {
        this.postService.getPosts().subscribe();
        this.userService.suggestUsers().subscribe();
    }
}
