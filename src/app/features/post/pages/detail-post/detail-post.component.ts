import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';

@Component({
    selector: 'app-detail-post',
    imports: [],
    templateUrl: './detail-post.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPostComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private postService = inject(PostService);
    public id = this.route.snapshot.paramMap.get('id');
    public post = signal<Post | null>(null);

    ngOnInit(): void {
        this.postService.getPostById(String(this.id)).subscribe(res => this.post.set(res.post));
    }
}
