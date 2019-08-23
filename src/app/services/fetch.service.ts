import { Injectable } from '@angular/core';
import { Api } from './../env';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private static _INSTANCE: FetchService;
  private historyStart;
  private historyEnd;
  constructor(private auth: AuthGuardService) {
    return FetchService._INSTANCE = FetchService._INSTANCE || this;
  }

  fetchGameRecords(startDate , endDate) {
    return fetch(`${Api.gameRecordApi}/${startDate}/${endDate}` , {
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

  fetchInOutRecords(startDate , endDate) {
    return fetch(`${Api.betRecordApi}/${startDate}/${endDate}` , {
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
