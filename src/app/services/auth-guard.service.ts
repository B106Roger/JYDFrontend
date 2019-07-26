import { Injectable } from '@angular/core';
import { Api , fakeUser } from '../env';
import { CanActivate, Router } from '@angular/router';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  private static _INSTANCE: AuthGuardService;
  private UID: string = null;
  private UserID;
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
    const data = JSON.stringify({UserID: account, Password: password});

    return fetch( Api.loginApi , { method: 'POST' , body : data})
      .then( response => {
        if ( !response.ok ) {
          throw Error( response.statusText );
        } else {
          return response.json();
        }
      })
      .then( responseJson => {
        this.UID = responseJson.UID;
        this.UserID = account;
        sessionStorage.setItem('UID' , this.encrypt( responseJson.UID ) );
        if ( remember ) {
          localStorage.setItem('UserID' , this.encrypt( account ) );
          localStorage.setItem('Password' , this.encrypt( password ) );
        }

        return true;
      })
      .catch( error => {
        alert( error );

        return false;
    });
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

  getUID() {
    return this.UID = this.UID || this.decrypt( sessionStorage.getItem('UID') ) ;
  }

  getUserID() {
    return this.UserID = this.UserID || this.decrypt( localStorage.getItem('UserID') ) ;
  }
}
