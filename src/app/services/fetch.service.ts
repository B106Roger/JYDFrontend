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
  private preloadImageLanguage: string[] = [];
  public userAmount$ = new Subject<string>();
  public gameList$ = new Subject<string>();
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
      sessionStorage.setItem('amount', responseJSON.account.amount);
      this.userAmount$.next(responseJSON.account.amount);
      console.log('request');
      return responseJSON;
    });
  }

  fetchGameList() {
    return fetch(`${Api.gameListApi}`).then(response => {
      return response.json();
    }).then((responseJSON: any[]) => {
      // 依照priority排序
      responseJSON = responseJSON.sort((gameItem1, gameItem2) => {
        return gameItem1.Priority < gameItem2.Priority ? 1 : -1;
      });
      // 將gamelab-前墜去掉
      const deprecateWord = 'gamelab-';
      responseJSON.forEach(function(part, index) {
        this[index].GameName = this[index].GameName.substr(this[index].GameName.indexOf(deprecateWord) + deprecateWord.length);
      }, responseJSON);

      const stringifyData = JSON.stringify(responseJSON);
      if (stringifyData !== localStorage.getItem('gameList')) {
        // 儲存資料到localStorage
        localStorage.setItem('gameList', JSON.stringify(responseJSON));
        this.gameList$.next(JSON.stringify(responseJSON));
        // 將先前的preload image language清除
        this.preloadImageLanguage = [];
      }
      return responseJSON;
    }).catch(err => {
      console.error(err);
    });
  }

  preloadGameListImage() {
    // 確定同個語系沒有重複preload
    if (this.preloadImageLanguage.includes(localStorage.getItem('lang'))) {
      return;
    } else {
      this.preloadImageLanguage.splice(0, 0, localStorage.getItem('lang'));
    }
    // 取得gameList data
    const data = localStorage.getItem('gameList');
    console.log(data);
    let gameList: any[];
    if (data !== null) {
      gameList = JSON.parse(data);
    }
    // 依照GameName及語系取得圖片位置，並prelaod
    gameList.forEach((item, index) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      if (index === 0) {
        link.href = `/assets/imgs/${localStorage.getItem('lang')}/pic_game_iconL_${item.GameName}_${localStorage.getItem('lang')}.png`;
      } else {
        link.href = `/assets/imgs/${localStorage.getItem('lang')}/pic_game_iconS_${item.GameName}_${localStorage.getItem('lang')}.png`;
      }
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  preloadLoginImage() {

  }
}
