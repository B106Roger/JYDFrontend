import { GameRecord } from './../models/game-record';
import { InOutRecord } from './../models/in-out-record';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private gameRecord: Array<GameRecord>;
  private ioRecord: Array<InOutRecord>;

  constructor(private http:HttpClient) {

  }

  getGameRecord(): Array<GameRecord> {
    return this.gameRecord;
  }

  getInOutRecord(): Array<InOutRecord> {
    return this.ioRecord;
  }
}
