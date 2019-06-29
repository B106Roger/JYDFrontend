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
  }
}
