import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
@Injectable({
  providedIn: 'root'
})
export class AutoGuardService implements CanActivate {

  constructor(private auth: AuthGuardService, private router: Router) { }

  canActivate() {
    const sessionUID = sessionStorage.getItem('Token') ;
    if ( sessionUID !== null ) {
      if ( this.auth.decrypt( sessionUID ) !== null ) {
        this.router.navigate(['/lobby'], {skipLocationChange: true});
      }
    }
    return true;
  }
}
