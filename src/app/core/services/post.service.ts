import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Comment, CommentResponse } from '@core/models/comment';
import { Post, PostResponse } from '@core/models/post';
import { User } from '@core/models/user';
import { BehaviorSubject, catchError, delay, finalize, from, Observable, switchMap, tap, throwError } from 'rxjs';
import { GetPostsResponse } from './../models/post';
import { AuthService } from './auth.service';
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
    public readonly authService = inject(AuthService);

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

    public getUserPosts(_id: string): Observable<Partial<GetPostsResponse>> {
        this.loading.set(true);
        return this.http.get<Partial<GetPostsResponse>>(`/user_posts/${_id}`).pipe(
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't get user posts.", error));
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

    public savePost(_id: string): Observable<{ msg: string }> {
        // @ts-ignore
        return this.http.patch<{ msg: string }>(`/savePost/${_id}`).pipe(
            tap(res => {
                const data = this.authService.authData();
                this.authService.authData.set({
                    ...data,
                    saved: [...(data?.saved || []), _id]
                } as User);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't save post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public unSavePost(_id: string): Observable<{ msg: string }> {
        // @ts-ignore
        return this.http.patch<{ msg: string }>(`/unSavePost/${_id}`).pipe(
            tap(res => {
                const data = this.authService.authData();
                this.authService.authData.set({
                    ...data,
                    saved: data?.saved.filter(i => i !== _id)
                } as User);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't save post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public likePost(_id: string): Observable<{ msg: string }> {
        this.loading.set(true);
        // @ts-ignore
        return this.http.patch<{ msg: string }, any>(`/post/${_id}/like`).pipe(
            tap(res => {
                this.snackbar.open(res.msg);
                this.postsSubject$.next(
                    this.postsSubject$.value.map(post =>
                        post._id === _id
                            ? {
                                  ...post,
                                  likes: [...post.likes, this.authService.authData() as User]
                              }
                            : post
                    )
                );
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't like post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public unlikePost(post: Post): Observable<{ msg: string }> {
        this.loading.set(true);
        // @ts-ignore
        return this.http.patch<{ msg: string }, Post>(`/post/${post._id}/unlike`).pipe(
            tap(res => {
                this.snackbar.open(res.msg);
                const newPost = {
                    ...post,
                    likes: post.likes.filter(like => like._id !== (this.authService.authData() as User)._id)
                };
                this.postsSubject$.next(this.postsSubject$.value.map(p => (p._id === post._id ? newPost : post)));
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't like post.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public createComment(data: Partial<Comment>, post: Post): Observable<CommentResponse> {
        this.loading.set(true);
        return this.http.post<CommentResponse, Partial<Comment>>('/comment', data).pipe(
            tap(res => {
                const newPost = { ...post, comments: [...post.comments, res.comment] };
                this.postsSubject$.next(
                    this.postsSubject$.value.map(post => (post._id === newPost._id ? newPost : post))
                );
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't create post comment.", error));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public deleteComment(_id: string): Observable<{ msg: string }> {
        this.loading.set(true);
        return this.http.delete<{ msg: string }>(`/comment/${_id}`).pipe(
            tap(res => {
                this.snackbar.open(res.msg);
                this.postsSubject$.next(
                    this.postsSubject$.value.map(post => ({
                        ...post,
                        comments: post.comments.filter(comment => comment._id !== _id)
                    }))
                );
            }),
            catchError(error => {
                this.loading.set(false);
                return throwError(() => new Error("Couldn't create post comment.", error));
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
