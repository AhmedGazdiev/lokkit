import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: boolean = true;

  public login(data: any) {
    console.log('User data:', data);
  }

  public register(data: any) {
    console.log('User data:', data);
  }

  public logout() {
    console.log('User logged out');
  }
}
