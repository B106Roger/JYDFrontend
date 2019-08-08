import { Injectable } from '@angular/core';
import { Api } from '../env';
import { CanActivate, Router } from '@angular/router';
import * as Crypto from 'crypto-js';

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {

  private static _INSTANCE: AuthGuardService;
  private token: string = null;
  private UserID;
  private formData = new FormData();
  private key;
  private iv;
  private OPTION: RequestInit = {
    method: 'post',
    body : this.formData,
    cache : 'no-cache',
    headers:  {
      Authorization : 'Basic ' + btoa('jyd.client:0AH#wjlzaU#&&P*XkY74')
    }
  };

  constructor(private router: Router) {
    this.key = Crypto.enc.Utf8.parse('RHBFDGPWMS193571');
    this.iv  = Crypto.enc.Utf8.parse('193571RHBFDGPWMS');
    this.formData.append('username' , null );
    this.formData.append('password' , null );
    this.formData.append('grant_type' , 'password');
    this.formData.append('scope' , 'GameManagement jyd.profile profile openid');
    return AuthGuardService._INSTANCE = AuthGuardService._INSTANCE || this;
  }

  canActivate() {
    console.log( 'decrypt Token: '    , this.decrypt( sessionStorage.getItem('Token')) );

    if ( localStorage.getItem('UserID') !== null ) {
      console.log( 'decrypt Account : ' , this.decrypt( localStorage.getItem('UserID') ));
    }

    if ( localStorage.getItem('Password') !== null ) {
      console.log( 'decrypt Password: ' , this.decrypt( localStorage.getItem('Password') ));
    }
    return this.loginValidate();
  }

  loginValidate() {
    const decryptToken = this.decrypt(sessionStorage.getItem('Token'));
    if (decryptToken !== null && decryptToken !== '') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  login(account: string, password: string , remember: boolean) {
    this.formData.set('username' , account);
    this.formData.set('password' , password);

    return fetch( Api.loginApi , this.OPTION )
      .then( response => {
        if ( !response.ok ) {
          throw Error( response.statusText );
        } else {
          return response.json();
        }
      })
      .then( responseJson => {
        this.token = responseJson.access_token;
        this.UserID = account;
        sessionStorage.setItem('Token' , this.encrypt( this.token ) );
        sessionStorage.setItem('Scope' , 'GameManagement jyd.profile openid profile' );
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
    sessionStorage.removeItem('Token');
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

  getToken() {
    return this.token = this.token   || this.decrypt( sessionStorage.getItem('Token') ) ;
  }

  getUserID() {
    return this.UserID = this.UserID || this.decrypt( localStorage.getItem('UserID') ) ;
  }
}
