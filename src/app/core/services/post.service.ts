import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post, PostResponse } from '@core/models/post';
import { BehaviorSubject, catchError, delay, finalize, from, Observable, switchMap, tap, throwError } from 'rxjs';
import { GetPostsResponse } from './../models/post';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';
import { UploadImagesService } from './upload-images.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private http = inject(HttpService);
    private storage = inject(LocalStorageService);
    private loading$ = new BehaviorSubject<boolean>(false);
    private postsSubject$ = new BehaviorSubject<Post[]>([]);
    public readonly posts$ = this.postsSubject$.asObservable();
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);
    private uplImg = inject(UploadImagesService);

    public createPost(data: Post) {
        return from(this.uplImg.uploadImages(data.images)).pipe(
            switchMap(images => {
                return this.http.post<PostResponse, Post>('/posts', { ...data, images });
            }),
            delay(1000),
            tap(res => {
                this.postsSubject$.next([...this.postsSubject$.value, res.post]);
                this.storage.set('posts', this.postsSubject$.value);
                this.snackbar.open(res.msg);
                this.router.navigate(['/feed']);
            }),
            catchError(error => {
                this.loading$.next(false);
                return throwError(() => new Error("Couldn't create post.", error));
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    public getPosts(): Observable<GetPostsResponse> {
        this.loading$.next(true);
        return this.http.get<GetPostsResponse>('/posts').pipe(
            delay(1000),
            tap(res => {
                this.postsSubject$.next([...res.posts]);
                this.storage.set('posts', res.posts);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading$.next(false);
                return throwError(() => new Error("Couldn't get posts", error));
            }),
            finalize(() => this.loading$.next(false))
        );
    }

    public getPostById(_id: string): Observable<Post> {
        this.loading$.next(true);
        return this.http.get<Post>(`/post/${_id}`).pipe(
            delay(1000),
            catchError(error => {
                this.loading$.next(false);
                return throwError(() => new Error("Couldn't get post", error));
            }),
            finalize(() => this.loading$.next(false))
        );
    }
}
