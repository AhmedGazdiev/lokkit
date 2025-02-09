import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { usersData } from '../usersData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public users: User[] = usersData;
  public activeUser: User | null = this.users[0];

  getUsers() {
    this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user._id === id);
  }

  // updateUser(id: number, newUser: User) {
  //   const user = this.getUserById(id);
  //   if (user) {
  //     user.name = newUser.name;
  //     user.username = newUser.username;
  //     user.email = newUser.email;
  //     user.avatar = newUser.avatar;
  //     user.gender = newUser.gender;
  //   }
  // }

  updateUser(id: number, newUser: User): void {
    this.users = this.users.map((user) =>
      user._id === id ? { ...user, ...newUser } : user
    );
  }

  switchUser(id: number): void {
    const user: User | undefined = this.getUserById(id);
    console.log(user);
    if (user) {
      this.activeUser = user;
    }
  }
}
