import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  title = 'JYDFrontend';
  updates = false;

  constructor(public swupdate: SwUpdate, public router: Router, private translate: TranslateService) {
    translate.addLangs(['en', 'zh-cn']);
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
    this.swupdate.available.subscribe(event => {
      this.updates = true;
      this.swupdate.activateUpdate().then(() => {
        document.location.reload();
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
    let preY = -1;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipod/.test( userAgent );
    if (isIOS === true) {
      scrollTo(0, 40);
       // 防止瀏覽器上下滑動
      window.addEventListener('touchmove', (e) => {
        if (e.touches[0].screenY !== preY && e.cancelable) {
          e.preventDefault();
        }
        preY = e.touches[0].screenY;
      }, {passive: false});

      // catch ios safari 轉方向的event
      window.addEventListener('resize', () => {
        let resizeId;
        if (resizeId) {
          clearTimeout(resizeId);
        }
        resizeId = setTimeout(() => {
          if (window.outerWidth >= window.outerHeight) {
            alert('change orientation to see full content');
          } else {
            scrollTo(0, 40);
          }
        }, 1000);
      }, false);
    }
  }
  displayIOSBar() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipod/.test( userAgent );
    if (isIOS === true) {
      return 'display';
    } else {
     return 'none';
    }
  }
}
