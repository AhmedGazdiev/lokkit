import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, LogoutResponse, RegisterRequest, RegisterResponse } from '@core/models/auth';
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
    private loadingSubject$ = new BehaviorSubject<boolean>(false);
    public readonly loading$ = this.loadingSubject$.asObservable();
    public authData = signal<User | null>(null);
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);

    public register(data: RegisterRequest): Observable<RegisterResponse> {
        this.loadingSubject$.next(true);
        return this.http.post<RegisterResponse, RegisterRequest>('/register', data).pipe(
            delay(1000),
            tap(res => {
                this.snackbar.open(res.msg);
                this.router.navigate(['/login']);
            }),
            catchError(error => {
                this.loadingSubject$.next(false);
                return throwError(() => new Error('failed to register', error));
            }),
            finalize(() => this.loadingSubject$.next(false))
        );
    }

    public login(data: LoginRequest): Observable<LoginResponse> {
        this.loadingSubject$.next(true);
        return this.http.post<LoginResponse, LoginRequest>('/login', data).pipe(
            delay(1000),
            tap(res => {
                this.storage.set('token', res.token);
                this.authData.set(res.user);
                this.router.navigate(['/feed']);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loadingSubject$.next(false);
                return throwError(() => new Error("couldn't log in", error));
            }),
            finalize(() => this.loadingSubject$.next(false))
        );
    }

    public getToken(): Observable<Partial<LoginResponse>> {
        this.loadingSubject$.next(true);
        return this.http.post<LoginResponse, User>('/refresh_token').pipe(
            tap(res => {
                this.storage.set('token', res.token);
                this.authData.set(res.user);
            }),
            catchError(error => {
                this.loadingSubject$.next(false);
                return throwError(() => new Error("couldn't get a token", error));
            }),
            finalize(() => this.loadingSubject$.next(false))
        );
    }

    public logout(): Observable<any> {
        this.loadingSubject$.next(true);
        return this.http.post<LogoutResponse, any>('/logout').pipe(
            delay(1000),
            tap(res => {
                this.authData.set(null);
                this.storage.remove('token');
                this.router.navigate(['/login']);
                this.snackbar.open(res.msg);
            }),
            catchError(error => {
                this.loadingSubject$.next(false);
                return throwError(() => new Error("couldn't log out", error));
            }),
            finalize(() => this.loadingSubject$.next(false))
        );
    }
}
