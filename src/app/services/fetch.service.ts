import { Injectable } from '@angular/core';
import { Api } from './../env';
import { AuthGuardService } from './auth-guard.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private auth: AuthGuardService, private trans: TranslateService) {
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
        if (this[index].GameName.indexOf(deprecateWord) !== -1) {
          this[index].GameName = this[index].GameName.substr(this[index].GameName.indexOf(deprecateWord) + deprecateWord.length);
        }
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

  preloadLoginImage(preloadType: string = 'preload') {

    // preload 與語系有關的圖片，須等載完語系檔才能preload
    const loginLanguageImageList: string[] = [
      'mainicon',
      'loginbtn',
      'loginbtnpressed'
    ];
    this.trans.getTranslation(this.trans.currentLang).subscribe(() => {
      loginLanguageImageList.forEach((item) => {
        const link = document.createElement('link');
        link.rel = preloadType;
        link.href = this.trans.instant('login.' + item);
        link.as = 'image';
        document.head.appendChild(link);
      });
    });

    // preload 與語系無關的圖片
    const loginImageList: string[] = [
      '/assets/imgs/bgLoginBig@2x.png',
      '/assets/imgs/picIdFrame@3x.png',
      '/assets/imgs/picPasswordFrame@3x.png',
      '/assets/imgs/picRememberFrame@2x.png',
      '/assets/imgs/iconRememberCheck.png',
      '/assets/imgs/iconLanEn.png',
      '/assets/imgs/iconLanSc.png',
      '/assets/imgs/iconLanEs.png',
      '/assets/imgs/iconLanPo.png'
    ];
    loginImageList.forEach((item) => {
      const link = document.createElement('link');
      link.rel = preloadType;
      link.href = item;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  preloadLobbyImage(preloadType: string = 'preload') {
    const lobbyImageList: string[] = [
      '/assets/imgs/picTopBg@2x.png',
      '/assets/imgs/picIdFrameEmpty@2x.png',
      '/assets/imgs/iconId@2x.png',
      '/assets/imgs/picCreditFrame@3x.png',
      '/assets/imgs/iconCreditDollar@2x.png',
      '/assets/imgs/btnSettingMenuNormal@3x.png',
      '/assets/imgs/btnSettingMenuPressed@3x.png',
      '/assets/imgs/picGameMenuBg@2x.png',
      '/assets/imgs/iconGameMenuDown.png',
      '/assets/imgs/iconGameMenuUp.png',
      '/assets/imgs/picGameFrameLarge.png',
      '/assets/imgs/picGameFrameSmall.png',
      '/assets/imgs/picBannerFrame.png',
      '/assets/imgs/btnLobbyBg@2x.png',
      '/assets/imgs/picBgLobby@2x.png'
    ];
    lobbyImageList.forEach((item) => {
      const link =  document.createElement('link');
      link.as = 'image';
      link.rel = preloadType;
      link.href = item;
      document.head.appendChild(link);
    });
  }

  preloadLobbyLanguageImage(preloadType: string = 'preload') {
    this.preloadGameListImage();
    this.preloadNavbarImage();
  }

  private preloadGameListImage(preloadType: string = 'preload') {
    // 當前語系
    const currentLang = this.trans.currentLang;
    // 確定同個語系沒有重複preload
    if (this.preloadImageLanguage.includes(localStorage.getItem('lang'))) {
      return;
    } else {
      this.preloadImageLanguage.splice(0, 0, localStorage.getItem('lang'));
    }
    // 取得gameList data
    const data = localStorage.getItem('gameList');
    let gameList: any[];
    gameList = (data !== null ? JSON.parse(data) : []);
    // 依照GameName及語系取得圖片位置，並prelaod
    gameList.forEach((item, index) => {
      const link = document.createElement('link');
      link.rel = preloadType;
      if (index === 0) {
        link.href = `/assets/imgs/${currentLang}/pic_game_iconL_${item.GameName}_${currentLang}.png`;
      } else {
        link.href = `/assets/imgs/${currentLang}/pic_game_iconS_${item.GameName}_${currentLang}.png`;
      }
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  private preloadNavbarImage(preloadType: string = 'preload') {
    // 當前語系
    const currentLang = this.trans.currentLang;
    // 依照大廳的四個連結取得
    const navBarList = [
      'btnLobbyNormal',
      'btnHistoryNormal',
      'btnAccountNormal',
      'btnContactNormal'
    ];
    navBarList.forEach((item) => {
      const link = document.createElement('link');
      link.rel = preloadType;
      link.href = `/assets/imgs/${currentLang}/${item}@2x.png`;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }
}
