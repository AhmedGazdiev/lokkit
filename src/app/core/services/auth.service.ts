import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginResponse, LogoutResponse, RegisterResponse } from '@core/models/auth';
import { User } from '@core/models/user';
import { BehaviorSubject, catchError, delay, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpService);
    private storage = inject(LocalStorageService);
    private loading = new BehaviorSubject<boolean>(false);
    public authData = new BehaviorSubject<User | null>(null);
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);

    public register(data: User): Observable<RegisterResponse> {
        this.loading.next(true);
        return this.http.post<RegisterResponse, User>('/register', data).pipe(
            delay(1000),
            tap(res => {
                this.snackbar.open(res.msg);
                this.router.navigate(['/login']);
            }),
            catchError(error => {
                this.loading.next(false);
                return throwError(() => new Error('failed to register', error));
            }),
            finalize(() => this.loading.next(false))
        );
    }

    public login(data: User): Observable<LoginResponse> {
        this.loading.next(true);
        return this.http.post<LoginResponse, User>('/login', data).pipe(
            delay(1000),
            tap(res => {
                this.storage.set('token', res.token);
                this.authData.next(res.user);
                this.router.navigate(['/feed']);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.next(false);
                return throwError(() => new Error("couldn't log in", error));
            }),
            finalize(() => this.loading.next(false))
        );
    }

    public getToken(): Observable<Partial<LoginResponse>> {
        this.loading.next(true);
        return this.http.post<LoginResponse, User>('/refresh_token').pipe(
            tap(res => {
                this.storage.set('token', res.token);
                this.authData.next(res.user);
            }),
            catchError(error => {
                this.loading.next(false);
                return throwError(() => new Error("couldn't get a token", error));
            }),
            finalize(() => this.loading.next(false))
        );
    }

    public logout(): Observable<any> {
        this.loading.next(true);
        return this.http.post<LogoutResponse, any>('/logout').pipe(
            delay(1000),
            tap(res => {
                this.authData.next(null);
                this.storage.remove('token');
                this.router.navigate(['/login']);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loading.next(false);
                return throwError(() => new Error("couldn't log out", error));
            }),
            finalize(() => this.loading.next(false))
        );
    }
}
