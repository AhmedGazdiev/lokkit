import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginResponse, RegisterResponse } from '@core/models/auth';
import { User } from '@core/models/user';
import { catchError, delay, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpService);
    private storage = inject(LocalStorageService);
    private loading = signal<boolean>(false);
    public token = signal<string | null>(null);
    public authData = signal<User | null>(null);
    private snackbar = inject(MatSnackBar);

    public register(data: User): Observable<RegisterResponse> {
        this.loading.set(true);
        return this.http.post<RegisterResponse, User>('/register', data).pipe(
            delay(1000),
            tap(res => {
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                console.log('failed to register', error);
                return throwError(() => new Error('failed to register'));
            }),
            finalize(() => this.loading.set(false))
        );
    }

    public login(data: User): Observable<LoginResponse> {
        return this.http.post<LoginResponse, User>('/login', data).pipe(
            delay(1000),
            tap(res => {
                this.storage.set('token', res.token);
                this.token.set(res.token);
                this.authData.set(res.user);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.set(false);
                console.log('failed to login', error);
                return throwError(() => new Error('failed to login'));
            }),
            finalize(() => this.loading.set(false))
        );
    }
}
