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

  constructor(public swupdate: SwUpdate, public router: Router, public translate: TranslateService) {}
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

    this.translate.addLangs(['en', 'zh-tw']);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

  }

  ngAfterViewInit() {
    let preY = -1;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipod/.test( userAgent );
    if (isIOS === true) {
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
