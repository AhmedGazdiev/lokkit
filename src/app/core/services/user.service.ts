import { Injectable } from '@angular/core';
import { usersData } from '../usersData';
import { User } from '@core/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public users: User[] = usersData;
    public activeUser: User | null = this.users[0];

    public getUsers() {
        return this.users;
    }

    public getUserById(id: number): User | undefined {
        return this.users.find(user => user._id === id);
    }

    public updateUser(id: number, newUser: User): void {
        this.users = this.users.map(user => (user._id === id ? { ...user, ...newUser } : user));
    }

    public switchUser(id: number): void {
        const user: User | undefined = this.getUserById(id);
        console.log(user);
        if (user) {
            this.activeUser = user;
        }
    }
}
