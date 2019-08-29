import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from 'src/app/services/fetch.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  account = '';
  password = '';
  remember: boolean;
  langShow = false;
  langChoosed = 'en';
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
  constructor(public route: Router, public translate: TranslateService, private auth: AuthGuardService, private fetch: FetchService) {  }

  ngOnInit() {
    // 設定語系
    this.langChoosed = localStorage.getItem('lang');
    // 設定記住帳密
    if (! localStorage.getItem('remember')) {
      this.remember = false;
      localStorage.setItem('remember', 'false');
    } else {
      this.remember = localStorage.getItem('remember') === 'true';
    }
  }

  ngAfterViewInit() {
    scrollTo(0, 40);
  }

  getRememberValue() {return this.remember; }
  getRememberStyle() {
    const displayVal = this.getRememberValue() === true ? 'inline' : 'none';
    return { display: displayVal };
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
    return this.langList.filter( e => e.lang === this.langChoosed )[0];
  }
  setLang(e:Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    const target = e.target as HTMLElement;
    const lang = target.dataset.lang;

    if (this.translate.getLangs().includes(lang)) {
      this.langChoosed = lang;
    } else {
      this.langChoosed = this.translate.defaultLang;
    }
    this.translate.use(this.langChoosed);
    localStorage.setItem('lang', this.langChoosed);
    document.querySelector('body').id = this.translate.currentLang;
    this.closePopper();
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
        }
    });
  }

  togglePopper(e:Event) {
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
}
