import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss']
})
export class DownloadAppComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }


  setNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('download-app.downloadImgNormal'));
  }

  setPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('download-app.downloadImgPressed'));
  }

}
