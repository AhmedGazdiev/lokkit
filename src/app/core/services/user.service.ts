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
            // tap(res => res),
            catchError(error => {
                this.loading.set(false);
                console.error('Ошибка при получении пользователей:', error);
                return throwError(() => new Error('Не удалось получить пользователя.'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public updateUser(id: number, newUser: User): void {}
}
