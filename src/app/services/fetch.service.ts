import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Api } from './../env';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private static _INSTANCE: FetchService;

  constructor(private http: HttpClient) {
    return FetchService._INSTANCE = FetchService._INSTANCE || this;
  }

  fetchGameRecords(startDate , endDate) {
    const requestUrl = `${Api.gameRecordApi}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get( requestUrl , { observe : 'response' });
  }

  fetchInOutRecords(startDate , endDate) {
    const requestUrl = `${Api.betRecordApi}?startDate=${startDate}&endDate=${endDate}`;
    return this.http.get( requestUrl , { observe : 'response' });
  }
}
