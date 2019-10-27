import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from './../../services/fetch.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {

  public currentPassword;
  private password;
  private confirm;
  constructor(public translate: TranslateService, private auth: AuthGuardService, private fetch: FetchService) {}

  ngOnInit() {
    this.currentPassword = this.auth.decrypt( sessionStorage.getItem('Password') );
    this.password = document.getElementById('password');
    this.confirm = document.getElementById('confirm');
  }

  setSaveNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.saveImgNormal'));
  }

  setCancelNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.cancelImgNormal'));
  }

  setSavePressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.saveImgPressed'));
  }

  setCancelPressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.cancelImgPressed'));
  }

  resetClicked() {
    this.password.value = null;
    this.confirm.value = null;
  }

  submitClicked() {
    if (this.password.value.length === 0 || this.confirm.value.length === 0) {
      window.alert('Form doesn\'t finish');
      return;
    }

    if (this.password.value === this.confirm.value) {
      this.fetch.fetchChangePassword( this.password.value );
    } else {
      window.alert('Not Match Password');
    }
  }
}
