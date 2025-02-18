import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;

  public login(email: any, password: any) {
    console.log('Данные пользователя:', email, password)
  }

  public register(data:any) {
    console.log('Данные пользователя:', data)
  }
}
