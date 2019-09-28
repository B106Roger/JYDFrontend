import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from 'src/app/services/fetch.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  account = '';
  password = '';
  remember: boolean;
  langShow = false;
  langList = [
    {
      lang: 'en',
      img: '/assets/imgs/iconLanEn.png',
      label: 'ENGLISH'
    },
    {
      lang: 'zh-cn',
      img: '/assets/imgs/iconLanSc.png',
      label: '简体中文'
    },
    {
      lang: 'es',
      img: '/assets/imgs/iconLanEs.png',
      label: 'Español'
    },
    {
      lang: 'pt',
      img: '/assets/imgs/iconLanPo.png',
      label: 'Português'
    }
  ];
  langChoosed = this.langList[0];
  loginSuccess = true;
  constructor(public route: Router, public translate: TranslateService, private auth: AuthGuardService, private fetch: FetchService) {  }

  ngOnInit() {
    // 設定語系
    if (localStorage.getItem('lang') !== null) {
      this.langChoosed = this.langList.filter((item) => item.lang === localStorage.getItem('lang'))[0];
    }
    // 設定記住帳密
    if (localStorage.getItem('remember') === 'true') {
      // 取得記住之帳密
      const account = localStorage.getItem('UserID');
      const password = localStorage.getItem('Password');
      if (account !== null && password !== null) {
        this.account = this.auth.decrypt(account);
        this.password = this.auth.decrypt(password);
      }
      this.remember = true;
    } else {
      localStorage.setItem('remember', 'false');
      this.remember = false;
    }
  }

  toggleRemeberValue() {
    this.remember = !this.remember;
    this.setRememberValue();
  }
  setRememberValue() {
    const setvalue = this.remember === true ? 'true' : 'false';
    localStorage.setItem('remember', setvalue);
  }
  getLang() {
    return this.langChoosed.lang;
  }
  setLang(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    const target = e.target as HTMLElement;
    const lang = target.dataset.lang;

    if (this.translate.getLangs().includes(lang)) {
      this.langChoosed = this.langList.filter((item) => item.lang === lang)[0];
    } else {
      this.langChoosed = this.langList.filter((item) => item.lang === this.translate.defaultLang )[0];
    }
    this.translate.use(this.langChoosed.lang);
    localStorage.setItem('lang', this.langChoosed.lang);
    document.querySelector('body').id = this.translate.currentLang;
    this.closePopper();
    // 重新preload Lobby 跟語系有關的圖片(GameList, Navbar)
    this.fetch.preloadLobbyLanguageImage();
  }

  login() {
    this.auth.login(this.account , this.password , this.remember)
      .then( loginState => {
        if ( loginState ) {
          this.fetch.fetchAmount().then(() => {
            this.route.navigate(['/lobby']);
          }).catch( err => {
            this.route.navigate(['/lobby']);
          });
        } else {
          this.loginSuccess = false;
        }
    });
  }

  togglePopper(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.langShow = ! this.langShow;
  }

  displayNotification() {
    if (!('Notification' in window)) {
      console.log('Notification not support');
    } else if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(reg => {
        if (reg === undefined) { console.log('ServiceWorker are denied'); return; }
        const options = {
          icon: 'assets/icons/jyd-128x128.png',
          body: 'Have fun in JYD world!!',
          image: 'assets/icons/jyd-128x128.png'
        };
        reg.showNotification('Wellcome to JYD', options);
      });
    } else {
      console.log('Notification are denied');
    }
  }

  closePopper() {
    this.langShow = false;
  }

  setBtnConfirmNormal(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('login.loginfailconfirm'));
  }
  setBtnConfirmPressed(e: Event) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('login.loginfailpress'));
  }
  closeLoginFailConfirmMsg() {
    this.loginSuccess = true;
  }
}
