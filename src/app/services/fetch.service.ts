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
    }).then(reponse => reponse.json()  );
  }

  fetchInOutRecords(startDate , endDate) {
    return fetch(`${Api.betRecordApi}/${startDate}/${endDate}` , {
      headers : new Headers({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    }).then(reponse => reponse.json());
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
        alert('Success');
      })
      .catch(error => {
        alert(error);
    });
  }
}
