import { inject, Injectable, signal } from '@angular/core';
import { Post } from '@core/models/post';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private readonly http = inject(HttpService);
    private readonly localStorageService = inject(LocalStorageService);
    private postsSubject$ = new BehaviorSubject<Post[]>([]);
    public readonly posts$ = this.postsSubject$.asObservable();
    public loading = signal<boolean>(false);

    public createPost(data: any) {
        console.log(data);
    }

    public getPosts() {
        return this.posts$;
    }

    public getPostById(id: number) {}

    public likePost(id: number) {}

    public updatePost(data: any) {
        console.log('This post has been edited:', data);
    }

    public deletePost() {
        console.log('this Post has been deleted');
    }
}
