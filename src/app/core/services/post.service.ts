import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Post, PostResponse } from '@core/models/post';
import { BehaviorSubject, catchError, delay, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private http = inject(HttpService);
    private storage = inject(LocalStorageService);
    private loading = new BehaviorSubject<boolean>(false);
    private postsSubject$ = new BehaviorSubject<Post[]>([]);
    public readonly posts$ = this.postsSubject$.asObservable();
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);

    public createPost(data: Post): Observable<PostResponse> {
        this.loading.next(true);
        return this.http.post<PostResponse, Post>('/posts', data).pipe(
            delay(1000),
            tap(res => {
                this.postsSubject$.next([...this.postsSubject$.value, res.post]);
                this.storage.set('posts', this.postsSubject$.value);
                this.snackbar.open(res.msg);
                this.router.navigate(['/feed']);
            }),
            catchError(error => {
                this.loading.next(false);
                return throwError(() => new Error("Couldn't create a post.", error));
            }),
            finalize(() => this.loading.next(false))
        );
    }
}
