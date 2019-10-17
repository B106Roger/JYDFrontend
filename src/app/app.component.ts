import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import {TranslateService} from '@ngx-translate/core';
import { Location } from '@angular/common';
import { FetchService } from './services/fetch.service';
// tslint:disable: no-string-literal

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  updates = false;
  displayHeader = 'none';
  userAgent = window.navigator.userAgent.toLowerCase();

  constructor(public swupdate: SwUpdate, private translate: TranslateService,
              private fetch: FetchService, private location: Location) {
    translate.addLangs(['eng', 'sch', 'esp', 'por']);
    const defaultLang = 'eng';
    // 先試local storage lang，再試browser lang，最後用default lang
    if (localStorage.getItem('lang')) {
      translate.use(localStorage.getItem('lang'));
    } else if (translate.langs.includes( translate.getBrowserLang())) {
      translate.use(translate.getBrowserLang());
    } else {
      translate.use(defaultLang);
    }
    localStorage.setItem('lang', this.translate.currentLang);
    translate.setDefaultLang(defaultLang);
    console.log(translate.currentLang);
  }

  ngOnInit(): void {
    // 設定語系id
    document.querySelector('body').id = localStorage.getItem('lang');
    // 設定其他參數
    window['isIphone'] = /iphone/.test( this.userAgent );
    window['isStandalone'] = 'standalone' in navigator && navigator['standalone'];

    if ( 'serviceWorker' in navigator) {
      // 如果service worker有被註冊時
      navigator.serviceWorker.getRegistrations().then(registrations => {
        // 當有新東西時更新pwa cache
        this.swupdate.available.subscribe(event => {
          this.updates = true;
          this.swupdate.activateUpdate().then(() => {
            document.location.reload();
          });
        });
      }).catch((err) => {
        console.log(err);
      });
    }

    // If the browser doesn't has the method createImageBitmap, you can't display webp format
    window['webpExtension'] = window['Modernizr'].webp.alpha === true ? '.webp' : '';

    // fetch gameList
    this.fetch.fetchGameList();

    // 如果當前頁面是login，就preload Login圖片，prefetch Lobby圖片
    if (this.location.path() === '' || this.location.path() === '?utm_source=pwa_app') {
      this.fetch.preloadLoginLanguageImage(this.translate.currentLang, true);
      this.fetch.preloadLoginImage();
      this.fetch.preloadLobbyImage();
      // 取得上次存的GameList，並預載遊戲圖片
      if (localStorage.getItem('gameList') !== null) {
        this.fetch.preloadLobbyLanguageImage(this.translate.currentLang);
      }
    }

    // 當fetch的gameList有改變時就再預載遊戲圖片
    this.fetch.gameList$.subscribe((data: string) => {
      this.fetch.preloadImageLanguage = [];
      this.fetch.preloadLobbyLanguageImage(this.translate.currentLang);
    });


    // 使android 長按圖片不會出現框框
    document.body.addEventListener('contextmenu', e => {
      const targetEle = e.target as HTMLElement;
      if (targetEle.nodeName === 'IMG') {
        e.preventDefault();
        return false;
      }
    });
  }

  ngAfterViewInit() {
    let time = new Date().getTime();
    if (window['isIphone'] === true) {
      // 當網頁是經由home開啟時要防止縮放滑動
      if (window['isStandalone']) {

        // 防止雙手縮放
        document.addEventListener('touchstart', event => {
          const tmp = new Date().getTime();
          if (event.touches.length > 1 || tmp - time < 300) {
              event.preventDefault();
          }
          time = tmp;
        }, {passive: false});

        // 設定iphone meta tag
        // 當是iphone x時，設定viewport tag
        if ( window.screen.height >= 812 && screen.width >=  375 ) {
          const metaTag = document.getElementById('viewport');
          metaTag.setAttribute('content', 'viewport-fit=cover, width=device-width, initial-scale=1.001, maximum-scale=1.001');
        }

        // 設定iphone standalone style
        const approot = document.querySelector('app-root') as HTMLElement;
        approot.style.position = 'fixed';
        approot.style.top = '0';
      }
      // 處理andoird 虛擬鍵盤影響影響畫面Layout
    } else {
      const metaTag = document.getElementById('viewport');
      const screenHeight = window.screen.height;
      const innerHeight = window.innerHeight;
      const height = screenHeight > innerHeight ? innerHeight : screenHeight;
      metaTag.setAttribute('content', `width=${window.screen.width}, height=${height} initial-scale=1.001, maximum-scale=1.001`);
    }


  }
  isLoginOrGame() {
    const dst = this.location.path();
    return dst === '' || dst.match('/game/') || dst === '?utm_source=pwa_app';
  }
}
