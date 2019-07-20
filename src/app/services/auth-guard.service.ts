import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    console.log('gurad is work');
    return this.loginValidate();
  }

  loginValidate() {
    if (localStorage.getItem('test') === '123') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
