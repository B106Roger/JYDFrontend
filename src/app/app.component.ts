import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { __asyncDelegator } from 'tslib';
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
  isIphone = /iphone/.test( this.userAgent );
  isStandalone = 'standalone' in navigator && navigator['standalone'];

  constructor(public swupdate: SwUpdate, public router: Router, private translate: TranslateService, private fetch: FetchService) {
    translate.addLangs(['en', 'zh-cn', 'es', 'pt']);
    translate.setDefaultLang('en');
    // 檢查localStorage沒有語系紀錄
    if (localStorage.getItem('lang')) {      // 有，使用localStorage語系
      translate.use(localStorage.getItem('lang'));
      console.log('localstorage lang', localStorage.getItem('lang'));
    } else {                                 // 沒有
      const browserLang = translate.getBrowserLang();
      if (translate.langs.includes(browserLang)) {
        translate.use(browserLang);
      } else {
        translate.use(translate.defaultLang);
      }
      console.log('browser lang', translate.getBrowserLang());
    }
    localStorage.setItem('lang', this.translate.currentLang);
  }

  ngOnInit(): void {
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
    // 設定語系id
    document.querySelector('body').id = localStorage.getItem('lang');
    // 設定其他參數
    window['isIphone'] = this.isIphone;
    window['isStandalone'] = this.isStandalone;
    console.log(this.router.url);

    // 如果當前頁面不是lobby
    if (this.router.url === '/') {
      this.fetch.preloadLoginImage('preload');
      this.fetch.preloadLobbyImage('prefetch');
      // 取得GameList
      if (localStorage.getItem('gameList') !== null) {
        this.fetch.preloadLobbyLanguageImage('prefetch');
      }
    }

    this.fetch.gameList$.subscribe((data) => {
      const prelaodOption = this.router.url.match('/lobby') ? 'preload' : 'prefetch';
      this.fetch.preloadLobbyLanguageImage(prelaodOption);
    });
    this.fetch.fetchGameList();

    // catch app install event
    window.addEventListener('appinstalled', (e) => {
      console.log('app installed');
    });
  }

  ngAfterViewInit() {
    let time = new Date().getTime();
    if (window['isIphone'] === true) {
      scrollTo(0, 100);
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
      console.log(`meta width: ${window.screen.width}; height: ${height}`);
      metaTag.setAttribute('content', `width=${window.screen.width}, height=${height} initial-scale=1.001, maximum-scale=1.001`);
    }


  }
  isLoginOrGame() {
    const dst = this.router.url;
    return dst === '/' || dst.match('/game/') || dst === '/?utm_source=pwa_app';
  }
}
