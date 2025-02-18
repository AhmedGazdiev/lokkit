import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn: boolean = false;

  public login(data:any) {
    console.log('Данные пользователя:', data)
  }

  public register(data:any) {
    console.log('Данные пользователя:', data)
  }
}
