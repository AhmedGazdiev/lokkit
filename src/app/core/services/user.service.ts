import { inject, Injectable } from '@angular/core';
import { User } from '@core/models/user';
import { BehaviorSubject } from 'rxjs';
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
    public loading$ = new BehaviorSubject<boolean>(false);
    public readonly activeUser$ = new BehaviorSubject<User | null>(this.usersSubject$.value[0]);

    public getUsers() {
        return this.users$;
    }

    public getUserById(id: number): User | undefined {
        return;
    }

    public updateUser(id: number, newUser: User): void {}
}
