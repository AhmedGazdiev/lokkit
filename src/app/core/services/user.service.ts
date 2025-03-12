import { inject, Injectable, signal } from '@angular/core';
import { User } from '@core/models/user';
import { BehaviorSubject, catchError, delay, finalize, map, Observable, retry, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly http = inject(HttpService);
    private readonly localStorageService = inject(LocalStorageService);
    private usersSubject$ = new BehaviorSubject<User[]>([]);
    public readonly users$ = this.usersSubject$.asObservable();
    public loading = signal<boolean>(false);
    public readonly activeUser$ = this.users$.pipe(map(users => users[0]));

    public createUser(newUser: Partial<User>): Observable<User> {
        this.loading.set(true);
        return this.http.post<User, Partial<User>>('/users', newUser).pipe(
            delay(1000),
            retry(2),
            tap(res => {
                this.usersSubject$.next([...this.usersSubject$.value, res]);
                this.localStorageService.set('users', this.usersSubject$.value);
                console.log('Пользователь создан успешно. =>', res);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при создании пользователя:', error);
                return throwError(() => new Error('Не удалось создать пользователя.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getUsers(): Observable<User[]> {
        this.loading.set(true);
        return this.http.get<User[]>('/users').pipe(
            delay(1000),
            retry(2),
            tap(res => {
                this.usersSubject$.next([...res]);
                this.localStorageService.set('users', res);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при получении пользователей:', error);
                return throwError(() => new Error('Не удалось получить пользователей.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public getUserById(id: number): Observable<User> {
        this.loading.set(true);
        return this.http.get<User>(`/users/${id}`).pipe(
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

    public updateUser(id: number, updatedUser: Partial<User>): Observable<User> {
        this.loading.set(true);
        return this.http.patch<User, Partial<User>>(`/users/${id}`, updatedUser).pipe(
            delay(1000),
            retry(2),
            tap(res => {
                const updatedUser = this.usersSubject$.value.map(user =>
                    user.id === res.id ? { ...user, ...res } : user
                );
                this.usersSubject$.next(updatedUser);
                this.localStorageService.set('users', this.usersSubject$.value);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при обновлении пользователей:', error);
                return throwError(() => new Error('Не удалось обновить пользователя.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public deleteUser(id: number): Observable<any> {
        this.loading.set(true);
        return this.http.delete<User>(`/users/${id}`).pipe(
            delay(1000),
            retry(2),
            tap(res => {
                this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== res.id));
                this.localStorageService.set('users', res);
            }),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при удалении пользователя:', error);
                return throwError(() => new Error('Не удалось удалить пользователя.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }
}
