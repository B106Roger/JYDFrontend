import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'JYDFrontend';
  updates = false;

  constructor(public swupdate: SwUpdate) {}
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

    //
    window.scrollTo(0, 20);

    // 防止使用者往下滑
    // document.addEventListener('touchmove',  (event) => {
    //   event.preventDefault();
    // }, { passive: false });
  }

  displayIOSBar() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test( userAgent );
    if (isIOS === true) {
      return 'display';
    } else {
      return 'none';
    }
  }
}
