import { inject, Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '@core/models/user';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { UploadImagesService } from './upload-images.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private http = inject(HttpService);
    private _loading = signal<boolean>(false);
    private loading = this._loading.asReadonly();
    private suggestUsersSubject$ = new BehaviorSubject<User[]>([]);
    public readonly suggestUsers$ = this.suggestUsersSubject$.asObservable();
    private snackbar = inject(MatSnackBar);
    private router = inject(Router);
    private uplImg = inject(UploadImagesService);
    public readonly authService = inject(AuthService);
}
