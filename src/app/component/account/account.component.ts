import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  constructor(public translate: TranslateService) { }

  ngOnInit() {
  }

  setSaveNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('account.saveImgNormal'));
  }

  setCancelNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('account.cancelImgNormal'));
  }

  setSavePressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('account.saveImgPressed'));
  }

  setCancelPressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('account.cancelImgPressed'));
  }
}
