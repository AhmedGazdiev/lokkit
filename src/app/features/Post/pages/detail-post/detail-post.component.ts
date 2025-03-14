import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    public post!: any;
    id: string | null = null;

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.post = this.postService.getPostById(Number(this.id));
    }
}
