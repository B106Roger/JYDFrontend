import { GameRecord } from './../models/game-record';
import { Injectable } from '@angular/core';
import { Api } from './../env';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private static _INSTANCE: FetchService;

  constructor(private auth: AuthGuardService) {

    return FetchService._INSTANCE = FetchService._INSTANCE || this;
  }

  fetchGameRecords(startDate , endDate) {
    const requestUrl = `${Api.gameRecordApi}?StartDate=${startDate}&EndDate=${endDate}&UID=${this.auth.getUID()}`;
    return fetch(requestUrl).then(reponse => reponse.json()  );
  }

  fetchInOutRecords(startDate , endDate) {
    const requestUrl = `${Api.betRecordApi}?StartDate=${startDate}&EndDate=${endDate}&UID=${this.auth.getUID()}`;
    return fetch(requestUrl).then(reponse => reponse.json());
  }
}
