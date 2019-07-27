import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { __asyncDelegator } from 'tslib';
// tslint:disable: no-string-literal

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'JYDFrontend';
  updates = false;
  displayHeader = 'none';
  constructor(public swupdate: SwUpdate, public router: Router, private translate: TranslateService) {
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
    // 當有新東西時更新pwa cache
    navigator.serviceWorker.getRegistrations().then(registrations => {
      this.swupdate.available.subscribe(event => {
        this.updates = true;
        this.swupdate.activateUpdate().then(() => {
          document.location.reload();
        });
      });
    });

    // 詢問瀏覽器是否接受通知
    if ('serviceWorker' in navigator) {
      Notification.requestPermission((status) => {
        console.log('Notification permission status:', status);
      });
    }
  }

  ngAfterViewInit() {
    let startY = -1;
    let endY = -1;
    let time = new Date().getTime();
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipod/.test( userAgent );
    const isStandalone = 'standalone' in navigator && navigator['standalone'];
    if (isIOS === true) {
      scrollTo(0, 40);

      // 當網頁是經由home開啟時要防止縮放滑動
      if (isStandalone) {
        // 防止瀏覽器上下滑動
        window.addEventListener('touchmove', (e) => {
          endY = e.changedTouches[0].pageY;
          if (Math.abs(startY - endY) > 7) {
            e.preventDefault();
          }
        }, {passive: false});

        // 防止雙手縮放
        document.addEventListener('touchstart', event => {
          const tmp = new Date().getTime();
          if (event.touches.length > 1 || tmp - time < 300) {
              event.preventDefault();
              event.stopPropagation(); // maybe useless
          } else {
            startY = event.changedTouches[0].pageY;
          }
          time = tmp;
        }, {passive: false});
      }


      // 取得轉方向的event
      window.addEventListener('resize', () => {
        document.body.style.height = `$(window.innerHeight)`;
        let resizeId;
        if (resizeId) {
          clearTimeout(resizeId);
        }
        resizeId = setTimeout(() => {
          if (window.outerWidth >= window.outerHeight) {
            alert('change orientation to see full content');
          } else if (isStandalone) {
            scrollTo(0, 40);
          }
        }, 500);
      }, false);
    }
    this.displayIOSBar();
  }

  displayIOSBar() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone/.test( userAgent );
    const isStandalone = 'standalone' in navigator && navigator['standalone'];
    if (isIOS === true) {
      this.displayHeader = 'block';
    }
  }
}
