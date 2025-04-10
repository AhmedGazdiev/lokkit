import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GetUsersResponse, User } from '@core/models/user';
import { BehaviorSubject, catchError, finalize, from, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { UploadImagesService } from './upload-images.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpService);
    public readonly authService = inject(AuthService).authData;
    private snackbar = inject(MatSnackBar);
    private uplImg = inject(UploadImagesService);
    private router = inject(Router);
    private _loading = signal<boolean>(false);
    private loading = this._loading.asReadonly();
    private suggestUsersSubject$ = new BehaviorSubject<User[]>([]);
    public readonly suggestUsers$ = this.suggestUsersSubject$.asObservable();
    private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
    private userSubject$ = new BehaviorSubject<User | null>(null);
    public readonly user$ = this.userSubject$.asObservable();
    public readonly users$ = this.usersSubject$.asObservable();

    public suggestUsers(): Observable<GetUsersResponse> {
        this._loading.set(true);
        return this.http.get<GetUsersResponse>('/suggestionsUser').pipe(
            tap(res => {
                this.suggestUsersSubject$.next([...res.users]);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't get users", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public getUserById(_id: string) {
        this._loading.set(true);
        return this.http.get<{ user: User }>(`/user/${_id}`).pipe(
            tap(res => {
                this.usersSubject$.next([...this.usersSubject$.value, res.user]);
                this.userSubject$.next(res.user);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't get user", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public follow(user: User): Observable<{ newUser: User }> {
        const auth = this.authService;
        this._loading.set(true);
        // @ts-ignore
        return this.http.patch<{ newUser: User }>(`/user/${user?._id}/follow`).pipe(
            tap(() => {
                const newUser = {
                    ...user,
                    followers: [...user.followers, auth()]
                } as User;
                this.selectedUser(newUser);
                auth.set({
                    ...auth(),
                    following: [...(auth() as User)?.following, user]
                } as User);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't follow user", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public unFollow(user: User): Observable<{ newUser: User }> {
        const auth = this.authService;
        this._loading.set(true);
        // @ts-ignore
        return this.http.patch<{ newUser: User }>(`/user/${user?._id}/unfollow`).pipe(
            tap(() => {
                const newUser = {
                    ...user,
                    followers: user.followers.filter(u => u._id !== auth()?._id)
                } as User;
                this.selectedUser(newUser);
                auth.set({
                    ...auth(),
                    following: auth()?.following.filter(u => u._id !== user._id)
                } as User);
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't unFollow user", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public editUser(data: Partial<User>, avatar: File) {
        const auth = this.authService;
        return from(this.uplImg.uploadImages([avatar])).pipe(
            switchMap(uploadedAvatars => {
                const avatar = uploadedAvatars[0];
                return this.http
                    .patch<{ msg: string }, Partial<User>>('/user', {
                        ...data,
                        avatar: avatar.url
                    })
                    .pipe(
                        tap(res => {
                            auth.set({
                                ...auth(),
                                ...data,
                                avatar: avatar.url
                            } as User);
                            this.selectedUser(auth() as User);
                            this.snackbar.open(res.msg);
                        })
                    );
            }),
            catchError(error => {
                return throwError(() => new Error("Couldn't update user", error));
            }),
            finalize(() => this._loading.set(false))
        );
    }

    public selectedUser(data: User) {
        this.userSubject$.next(data);
    }
}
