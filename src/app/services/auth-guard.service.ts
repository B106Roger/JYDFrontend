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
  private Password;
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

  static randomStr(length = 8) {
    const $char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';
    while (str.length < length ) {
      const index = Math.ceil(Math.random() * 35);
      str += $char[index];
    }
    return str;
  }

  canActivate() {
    return this.loginValidate();
  }

  loginValidate() {
    const token = sessionStorage.getItem('Token');
    if (token === null || token === undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    const decryptToken = this.decrypt(token);
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
        sessionStorage.setItem('UserID', this.encrypt( account ) );
        sessionStorage.setItem('Password' , this.encrypt( password ) );
        sessionStorage.setItem('Token' , this.encrypt( this.token ) );
        sessionStorage.setItem('Scope' , 'GameManagement jyd.profile openid profile' );
        if ( remember ) {
          localStorage.setItem('UserID' , this.encrypt( account ) );
          localStorage.setItem('Password' , this.encrypt( password ) );
        }

        return true;
      })
      .catch( error => {
        return false;
    });
  }

  logout(remember: boolean) {
    if (!remember) {
      localStorage.removeItem('UserID');
      localStorage.removeItem('Password');
    }
    sessionStorage.clear();
    this.UserID = null;
    this.Password = null;
    this.token = null;
    this.router.navigate(['/login']);
  }

  decrypt( text ) {
    const encryptedHexStr = Crypto.enc.Hex.parse( text );
    const srcs = Crypto.enc.Base64.stringify(encryptedHexStr);
    const decrypt = Crypto.AES.decrypt(srcs, this.key, { iv: this.iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    const decryptedStr = decrypt.toString(Crypto.enc.Utf8);
    return decryptedStr.toString().substring(8, decryptedStr.length - 8);
  }

  encrypt( text ) {
    const prefixSalt = AuthGuardService.randomStr();
    const suffixSalt = AuthGuardService.randomStr();
    const saltText = `${prefixSalt}${text}${suffixSalt}`;
    const srcs = Crypto.enc.Utf8.parse(saltText);
    const encrypted = Crypto.AES.encrypt(srcs, this.key, { iv: this.iv, mode: Crypto.mode.CBC, padding: Crypto.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  }

  getToken() {
    return this.token = this.token   || this.decrypt( sessionStorage.getItem('Token') ) ;
  }

  getUserID() {
    return this.UserID = this.UserID || this.decrypt( sessionStorage.getItem('UserID') ) ;
  }

  getPassword() {
    return this.Password = this.Password || this.decrypt( sessionStorage.getItem('Password') ) ;
  }
}
