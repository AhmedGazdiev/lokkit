import { inject, Injectable, signal } from '@angular/core';
import { Post } from '@core/models/post';
import { User } from '@core/models/user';
import { UserService } from '@core/services/user.service';
import { BehaviorSubject, catchError, delay, finalize, Observable, retry, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private readonly http = inject(HttpService);
    private readonly userService = inject(UserService);
    private readonly localStorageService = inject(LocalStorageService);
    private postsSubject$ = new BehaviorSubject<Post[]>([]);
    public readonly posts$ = this.postsSubject$.asObservable();
    public loading = signal<boolean>(false);
    activeUser = signal<User | null>(null);

    constructor() {
        this.userService.activeUser$.subscribe(user => {
            this.activeUser.set(user);
        });
    }

    public createPost(newPost: Partial<Post>): Observable<Post> {
        this.loading.set(true);
        return this.http.post<Post, Partial<Post>>('/posts', newPost).pipe(
            delay(1000),
            retry(2),
            tap(res => {
                this.postsSubject$.next([
                    ...this.postsSubject$.value,
                    {
                        ...res,
                        author: this.activeUser() as User,
                        likes: 0,
                        comments: [],
                        date: new Date('2023-10-01T10:00:00Z')
                    }
                ]);
                this.localStorageService.set('posts', this.postsSubject$.value);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при создании пользователя:', error);
                return throwError(() => new Error('Не удалось создать пользователя.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getPosts(): Observable<Post[]> {
        this.loading.set(true);
        return this.http.get<Post[]>('/posts').pipe(
            delay(500),
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
            delay(500),
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

    public updatePost(id: number, updatedPost: Partial<Post>): Observable<Post> {
        this.loading.set(true);
        return this.http.patch<Post, Partial<Post>>(`/posts/${id}`, updatedPost).pipe(
            delay(1000),
            retry(2),
            tap(res => {
                const updatedUser = this.postsSubject$.value.map(post =>
                    post.id === res.id ? { ...post, ...res } : post
                );
                this.postsSubject$.next(updatedUser);
                this.localStorageService.set('users', this.postsSubject$.value);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при обновлении поста:', error);
                return throwError(() => new Error('Не удалось обновить пост.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public deletePost(id: number): Observable<any> {
        this.loading.set(true);
        return this.http.delete<Post>(`/posts/${id}`).pipe(
            delay(500),
            retry(2),
            tap(res => {
                this.postsSubject$.next(this.postsSubject$.value.filter(user => user.id !== res.id));
                this.localStorageService.set('posts', res);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при удалении поста:', error);
                return throwError(() => new Error('Не удалось удалить пост.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }
}
