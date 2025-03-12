import { inject, Injectable, signal } from '@angular/core';
import { Post } from '@core/models/post';
import { BehaviorSubject, catchError, delay, finalize, Observable, retry, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

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

    public getPosts(): Observable<Post[]> {
        this.loading.set(true);
        return this.http.get<Post[]>('/posts').pipe(
            delay(1000),
            retry(2),
            tap(res => {
                this.postsSubject$.next([...res]);
                this.localStorageService.set('posts', res);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при получении пользователей:', error);
                return throwError(() => new Error('Не удалось получить пользователей.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getPostById(id: number): Observable<Post> {
        this.loading.set(true);
        return this.http.get<Post>(`/posts/${id}`).pipe(
            delay(1000),
            retry(2),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при получении пользователя по id:', error);
                return throwError(() => new Error('Не удалось получить пользователя по id.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public likePost(id: number) {}

    public updatePost(data: any) {
        console.log('This post has been edited:', data);
    }

    public deletePost() {
        console.log('this Post has been deleted');
    }
}
