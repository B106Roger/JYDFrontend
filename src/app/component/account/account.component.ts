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
  public successPrompt;
  public errorPrompt;
  public picAccountSuccess;
  public picAccountError;
  public confirmBtn;
  private password;
  private confirm;
  constructor(public translate: TranslateService, private auth: AuthGuardService, private fetch: FetchService) {}

  ngOnInit() {
    this.currentPassword = this.auth.decrypt( sessionStorage.getItem('Password') );
    this.password = document.getElementById('password');
    this.confirm = document.getElementById('confirm');
    this.picAccountSuccess = this.translate.instant('account.successPrompt');
    this.picAccountError = this.translate.instant('account.errorPrompt');
    this.picAccountError = this.translate.instant('account.errorPrompt');
    this.successPrompt = false;
    this.errorPrompt = false;
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

  setConfirmPressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.confirmBtnPressed'));
  }

  setConfirmNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('srcset' , this.translate.instant('account.confirmBtnNormal'));
  }

  resetClicked() {
    this.password.value = null;
    this.confirm.value = null;
  }

  submitClicked() {
    debugger;
    if (this.password.value.length === 0 || this.confirm.value.length === 0) {
      this.errorPrompt = true;
      return;
    }

    if ( this.password.value === this.confirm.value) {
       this.fetch.fetchChangePassword( this.password.value ).then( state => {
          this.successPrompt = true;
          console.log( state );
        }).catch( error => {
          this.errorPrompt = true;
          console.log( error );
      });
    } else {
      this.errorPrompt = true;
    }
  }

  closePrompt() {
    [this.errorPrompt , this.successPrompt] = [false, false];
  }

  btnSound(soundName: string) {
    if (window['sound'] === true) {
      const sound = document.querySelector('#' + soundName) as HTMLAudioElement;
      sound.currentTime = 0;
      sound.play().catch(err => {
        console.log(err);
      });
    }
  }
}
