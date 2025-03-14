import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@core/models/post';
import { PostService } from '@core/services/post.service';

@Component({
    selector: 'app-detail-post',
    imports: [],
    templateUrl: './detail-post.component.html',
    styleUrl: './detail-post.component.scss'
})
export class DetailPostComponent implements OnInit {
    private postService = inject(PostService);
    private route = inject(ActivatedRoute);
    public post!: Post;
    id: string | null = null;

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.postService.getPostById(Number(this.id)).subscribe(res => (this.post = res));
    }
}
