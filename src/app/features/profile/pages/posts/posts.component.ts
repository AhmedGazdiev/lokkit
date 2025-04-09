import { ChangeDetectionStrategy, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'posts',
    imports: [RouterLink],
    templateUrl: './posts.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit, OnDestroy {
    private destroy$ = new Subject<void>();
    public readonly postService = inject(PostService);
    private readonly route = inject(ActivatedRoute);
    public id!: string;
    public _posts = signal<Post[] | null>(null);

    ngOnInit(): void {
        this.id = this.route.parent?.snapshot.paramMap.get('id') as string;

        this.postService
            .getUserPosts(String(this.id))
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => this._posts.set(res.posts as Post[]));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
