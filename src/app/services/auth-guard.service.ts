import { Injectable } from '@angular/core';
import { fakeUser } from '../env';
import { CanActivate, Router } from '@angular/router';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  private static _INSTANCE: AuthGuardService;
  public _UID: string;
  public key;
  public iv;
  constructor(private router: Router) {
    this.key = Crypto.enc.Utf8.parse('RHBFDGPWMS193571');
    this.iv  = Crypto.enc.Utf8.parse('193571RHBFDGPWMS');
    return AuthGuardService._INSTANCE = AuthGuardService._INSTANCE || this;
  }

  canActivate() {
    console.log( 'decrypt UID: '      , this.decrypt(sessionStorage.getItem('UID')) );
    console.log( 'decrypt Account : ' , this.decrypt( localStorage.getItem('UserID') ));
    console.log( 'decrypt Password: ' , this.decrypt( localStorage.getItem('Password') ));
    return this.loginValidate();
  }

  loginValidate() {
    const decryptUID = this.decrypt(sessionStorage.getItem('UID'));
    if (decryptUID !== null && decryptUID !== '') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(account: string, password: string , remember: boolean) {
    if ( fakeUser.some( user => user.account === account && user.password === password ) ) {
      const UID = fakeUser.filter(user => user.account === account && user.password === password)[0].UID;

      sessionStorage.setItem('UID' , this.encrypt( UID ) );
      if ( remember ) {
        localStorage.setItem('UserID' , this.encrypt( account ) );
        localStorage.setItem('Password' , this.encrypt( password ) );
      }

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

  decrypt( text ) {
    const encryptedHexStr = Crypto.enc.Hex.parse( text );
    const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    const decrypt = Crypto.AES.decrypt(srcs, this.key, { iv: this.iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(Crypto.enc.Utf8);
    return decryptedStr.toString();
  }

  encrypt( text ) {
    const srcs = Crypto.enc.Utf8.parse(text);
    const encrypted = Crypto.AES.encrypt(srcs, this.key, { iv: this.iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }
}
