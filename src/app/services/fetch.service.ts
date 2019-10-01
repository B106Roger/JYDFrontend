import { Injectable } from '@angular/core';
import { Api } from './../env';
import { AuthGuardService } from './auth-guard.service';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { GameItem } from '../iterface';

@Injectable({
  providedIn: 'root'
})

export class FetchService {

  private static _INSTANCE: FetchService;
  private historyStart;
  private historyEnd;
  public preloadImageLanguage: string[] = [];
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
    }).then((responseJSON: GameItem[]) => {
      // 依照priority排序
      responseJSON = responseJSON.sort((gameItem1, gameItem2) => {
        return gameItem1.Priority < gameItem2.Priority ? 1 : -1;
      });

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





  // 預載函數
  preloadLoginImage(preloadType: string = 'preload') {
    console.log(this.trans.currentLang);
    let loginBackground: string;
    if (window.innerHeight >= 760) {
      loginBackground = '/assets/imgs/bgLoginBig.png';
    } else {
      loginBackground = '/assets/imgs/bgLogin.png';
    }
    // preload 與語系無關的圖片
    const loginImageList: string[] = [
      loginBackground,
      `/assets/imgs/${this.trans.currentLang}/picLogo@2x.png`,
      '/assets/imgs/picLanMenuBg.png',
      '/assets/imgs/picPasswordFrame@2x.png',
      '/assets/imgs/picIdFrame@2x.png',
      '/assets/imgs/picRememberFrame.png',
      `/assets/imgs/${this.trans.currentLang}/btnLoginNormal.png`,

      '/assets/imgs/iconLanEn.png',
      '/assets/imgs/iconLanSc.png',
      '/assets/imgs/iconLanEs.png',
      '/assets/imgs/iconLanPo.png',
      '/assets/imgs/iconLanMenuDown.png',

      '/assets/imgs/iconRememberCheck.png',
      '/assets/imgs/picLanMenuBgExpand.png',
      '/assets/imgs/iconLanMenuUp.png',
      `/assets/imgs/${this.trans.currentLang}/btnLoginPressed.png`,
    ];
    loginImageList.forEach((item) => {
      const image = new Image();
      image.src = item;
    });
  }

  preloadLobbyImage() {
    const lobbyImageList: string[] = [
      '/assets/imgs/picBgLobby.png',
      '/assets/imgs/picTopBg@2x.png',
      '/assets/imgs/picIdFrameEmpty@2x.png',
      '/assets/imgs/iconId@2x.png',
      '/assets/imgs/picCreditFrame@2x.png',
      '/assets/imgs/iconCreditDollar@2x.png',
      '/assets/imgs/btnSettingMenuNormal.png',

      '/assets/imgs/picGameMenuBg@2x.png',
      '/assets/imgs/iconGameMenuDown.png',
      '/assets/imgs/picGameFrameLarge.png',
      '/assets/imgs/picGameFrameSmall.png',
      '/assets/imgs/picBannerFrame.png',
      '/assets/imgs/btnLobbyBg.png',

      '/assets/imgs/btnSettingMenuPressed.png',
      '/assets/imgs/iconGameMenuUp.png',
    ];
    lobbyImageList.forEach((item) => {
      const image = new Image();
      image.src = item;
    });
  }

  preloadLobbyLanguageImage(lang: string) {
    // 確定同個語系沒有重複preload
    if (this.preloadImageLanguage.includes(localStorage.getItem('lang'))) {
      return;
    } else {
      this.preloadImageLanguage.splice(0, 0, localStorage.getItem('lang'));
    }
    this.preloadGameListImage(lang);
    this.preloadNavbarImage();
  }

  private preloadGameListImage(lang: string) {
    // 取得gameList data
    const data = localStorage.getItem('gameList');
    let gameList: any[];
    gameList = (data !== null ? JSON.parse(data) : []);
    // 載入前7張遊戲圖片，依照GameName及語系取得圖片位置
    gameList.forEach((item, index) => {
      let src: string;
      if (index === 0) {
        src = `/assets/imgs/${lang}/pic_game_iconL_${item.DisplayName}_${lang}.png`;
      } else if ( index < 7) {
        src = `/assets/imgs/${lang}/pic_game_iconS_${item.DisplayName}_${lang}.png`;
      } else {
        return;
      }
      const image = new Image();
      image.src = src;
    });
  }

  private preloadNavbarImage() {
    // 當前語系
    const currentLang = this.trans.currentLang;
    // 依照大廳的四個連結取得
    const navBarList = [
      'btnLobbyNormal@2x.png',
      'btnHistoryNormal@2x.png',
      'btnAccountNormal@2x.png',
      'btnContactNormal@2x.png'
    ];
    navBarList.forEach((item) => {
      const image = new Image();
      image.src = `/assets/imgs/${currentLang}/${item}`;
    });
  }
}
