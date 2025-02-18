import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;

  public login(email: any, password: any) {
    this.isLoggedIn = true;
    console.log('Данные пользователя:', email, password)
  }
}
