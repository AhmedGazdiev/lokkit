import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_URL } from '@core/api.token';
import { RegisterResponse } from '@core/models/auth';
import { User } from '@core/models/user';
import { BehaviorSubject, catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpService);
    private storage = inject(LocalStorageService);
    public isLoggedIn = new BehaviorSubject<boolean>(false);
    private loading = signal<boolean>(false);
    private snackbar = inject(MatSnackBar);

    public register(data: User): Observable<RegisterResponse> {
        this.loading.set(true);
        return this.http.post<RegisterResponse, User>('/register', data).pipe(
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
}
