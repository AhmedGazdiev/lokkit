import { inject, Injectable, signal } from '@angular/core';
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
    private loading = signal<boolean>(false);
    private postsSubject$ = new BehaviorSubject<Post[]>([]);
    public readonly posts$ = this.postsSubject$.asObservable();
    private _post = signal<Post | null>(null);
    public readonly post = this._post.asReadonly();
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);
    private uplImg = inject(UploadImagesService);
    public _isLike = signal<boolean>(false);

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
                this.loading.set(false);
                return throwError(() => new Error("Couldn't create post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getPosts(): Observable<GetPostsResponse> {
        this.loading.set(true);
        return this.http.get<GetPostsResponse>('/posts').pipe(
            tap(res => {
                this.postsSubject$.next([...res.posts]);
                this.storage.set('posts', res.posts);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't get posts", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getPostById(_id: string): Observable<PostResponse> {
        this.loading.set(true);
        return this.http.get<PostResponse>(`/post/${_id}`).pipe(
            tap(res => this._post.set(res.post)),
            catchError(error => {
                return throwError(() => new Error("Couldn't get post", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public editPost(_id: string, data: Post): Observable<PostResponse> {
        console.log(_id, data);
        return from(this.uplImg.uploadImages(data.images)).pipe(
            switchMap(images => {
                return this.http.patch<PostResponse, Post>(`/post/${_id}`, { ...data, images });
            }),
            delay(1000),
            tap(res => {
                this.postsSubject$.next(
                    this.postsSubject$.value.map(post => (post._id === res.post._id ? res.post : post))
                );
                this.storage.set('posts', [...this.postsSubject$.value, res.post]);
                this.snackbar.open(res.msg);
                this.router.navigate(['/feed']);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't create post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public likePost(_id: string): Observable<{ msg: string }> {
        this.loading.set(true);
        // @ts-ignore
        return this.http.patch<{ msg: string }, string>(`/post/${_id}/like`).pipe(
            tap(res => {
                this._isLike.set(true);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't like post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public unlikePost(_id: string): Observable<{ msg: string }> {
        this.loading.set(true);
        // @ts-ignore
        return this.http.patch<{ msg: string }, string>(`/post/${_id}/unlike`).pipe(
            tap(res => {
                this._isLike.set(false);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't like post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public deletePost(_id: string): Observable<PostResponse> {
        this.loading.set(true);
        return this.http.delete<PostResponse>(`/post/${_id}`).pipe(
            tap(res => {
                this.postsSubject$.next(this.postsSubject$.value.filter(post => post._id !== _id));
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't delete post", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }
}
