import { Injectable } from '@angular/core';
import { fakeUser } from '../env';
import { CanActivate, Router } from '@angular/router';

@Injectable()

export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
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
    if ( fakeUser.some( user => user.account === account &&  user.password === account ) ) {
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
