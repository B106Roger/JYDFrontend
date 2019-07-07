import { HttpClient } from '@angular/common/http';
import { GameRecord } from './../models/game-record';
import { InOutRecord } from './../models/in-out-record';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  private gameRecords: Array<any>;
  private ioRecords: Array<any>;
  private domain = 'http://127.0.0.1/jyd-api';
  constructor(private httpClient: HttpClient) {

  }

  getGameRecords(): Array<GameRecord> {
    fetch(`${this.domain}/api/history/gameRecords`)
      .then( response => {
        return response.json();
      })
      .then( jsonDatas => {
        return jsonDatas.map(gameRecord => {
          return [
            gameRecord.game_name,
            gameRecord.created_at,
            gameRecord.bet,
            gameRecord.win,
            gameRecord.begin,
            gameRecord.end,
          ];
        });
      })
      .then( gameRecords => {
        this.gameRecords = gameRecords;
      })
      .catch( error => {
        console.log('Some error:', error);
        this.gameRecords = [];
    });

    return this.gameRecords;
  }

  getInOutRecords(): Array<InOutRecord> {
    fetch(`${this.domain}/api/history/IORecords`)
      .then( response => {
        return response.json();
      })
      .then( jsonDatas => {
        return jsonDatas.map(ioRecord => {
          return [
            ioRecord.id,
            ioRecord.created_at,
            ioRecord.before,
            ioRecord.del,
            ioRecord.after,
          ];
        });
      })
      .then( ioRecords => {
        this.ioRecords = ioRecords;
      })
      .catch( error => {
        console.log('Some error:', error);
        this.gameRecords = [];
    });

    return this.ioRecords;
  }
}
