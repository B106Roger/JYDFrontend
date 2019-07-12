import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'JYDFrontend';
  updates = false;

  constructor(public swupdate: SwUpdate, public router: Router) {}
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
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0].screenY !== preY && e.cancelable) {
        e.preventDefault();
      }
      preY = e.touches[0].screenY;
    }, {passive: false});

    window.addEventListener('resize', () => {
      let resizeId;
      if (resizeId) {
        clearTimeout(resizeId);
      }
      resizeId = setTimeout(() => {
        // alert(
        //   'WindowInnerHeight: ' + window.innerHeight + ' windowInnerWidth: ' + window.innerWidth +
        //   ' WindowOuterHeight: ' + window.outerHeight + ' windowOutterWidth: ' + window.outerWidth
        //   );
        if (window.outerWidth >= window.outerHeight) {
          alert('change orientation to see full content');
        } else {
          scrollTo(0, 40);
        }
      }, 1000);
    }, false);
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
