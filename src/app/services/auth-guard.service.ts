import { Injectable } from '@angular/core';
import { fakeUser } from '../env';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuardService implements CanActivate {

  private static _INSTANCE: AuthGuardService;
  public test = 1;

  constructor(private router: Router) {
    return AuthGuardService._INSTANCE = AuthGuardService._INSTANCE || this;
  }

  canActivate() {
    this.test = 30;
    console.log('gurad is work');
    return this.loginValidate();
  }

  loginValidate() {
    if (localStorage.getItem('user') !== null) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(account: string, password: string) {
    if ( fakeUser.some( user => user.account === account && user.password === password ) ) {
      localStorage.setItem('user' , account);
      return true;
    } else {
      alert('User isn\'t exist');
      return false;
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
