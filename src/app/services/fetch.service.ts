import { Injectable } from '@angular/core';
import { Api } from './../env';
import { AuthGuardService } from './auth-guard.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private static _INSTANCE: FetchService;
  private historyStart;
  private historyEnd;
  public userAmount$ = new Subject<string>();
  constructor(private auth: AuthGuardService) {
    return FetchService._INSTANCE = FetchService._INSTANCE || this;
  }

  fetchGameRecords(startDate , endDate , page = 1) {
    return fetch(`${Api.gameRecordApi}/${startDate}/${endDate}/${page}` , {
      headers : new Headers({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    }).then( response => {
      if ( !response.ok ) {
        throw Error( response.statusText );
      } else {
        return response.json();
      }
    });
  }

  fetchInOutRecords(startDate , endDate , page = 1) {
    return fetch(`${Api.betRecordApi}/${startDate}/${endDate}/${page}` , {
      headers : new Headers({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    }).then( response => {
      if ( !response.ok ) {
        throw Error( response.statusText );
      } else {
        return response.json();
      }
    });
  }

  fetchChangePassword( nextPassword ) {
    const formData = new FormData();
    formData.append('oldPassword' , 'ggg3310');
    formData.append('newPassword' , 'ggg3312');
    fetch(`${Api.ChangePasswordApi}` , {
        headers : new Headers({
          Authorization: `Bearer ${this.auth.getToken()}`,
          'Content-Type' : 'application/json'

        }),
        body : JSON.stringify({
          oldPassword : this.auth.getPassword(),
          newPassword : nextPassword
        }),
        method : 'PUT'
      })
      .then( responser => {
        window.alert('Success');
      })
      .catch(error => {
        window.alert(error);
    });
  }

  fetchAmount() {
    return fetch(`${Api.amountApi}` , {
      headers : new Headers({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    }).then( response => {
      if ( !response.ok ) {
        throw Error( response.statusText );
      } else {
        return response.json();
      }
    }).then( responseJSON => {
      this.userAmount$.next(responseJSON.account.amount);
      console.log('request');
      sessionStorage.setItem('amount', responseJSON.account.amount);
      return responseJSON;
    });
  }

  fetchGameList() {
    return fetch(`${Api.gameListApi}`).then(response => {
      return response.json();
    });
  }
}
