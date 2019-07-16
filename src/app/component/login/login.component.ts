import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  account = '';
  password = '';
  remember = false;
  langShow = false;
  langChoosed = 'en';
  langList = [
    {
      lang: 'en',
      img: '/assets/imgs/iconLanEn.png',
      label: 'ENGLISH'
    },
    {
      lang: 'zh-tw',
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
      img: '/assets/imgs/iconLanSc.png',
      label: 'Português'
    }
  ]
  constructor(public route: Router, public translate: TranslateService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    scrollTo(0, 40);
  }

  getRememberValue() {return this.remember; }
  getRememberStyle() {
    const displayVal = this.getRememberValue() === true ? 'inline' : 'none';
    return { display: displayVal };
  }
  toggleRemeberValue() {this.remember = !this.remember; }
  langSelectOnShow() {
    this.langShow = ! this.langShow;
  }
  getLang() {
    return this.langList.filter( e => e.lang === this.langChoosed )[0];
  }
  setLang(lang: string) {
    this.langChoosed = lang;
    if (this.translate.getLangs().includes(lang)) {
      this.translate.use(this.getLang().lang);
    } else {
      this.translate.use(this.translate.defaultLang);
    }
  }

  login() {
    console.log('account: ', this.account);
    if (this.account === '123' && this.password === '123') {
      this.displayNotification();
      this.route.navigate(['lobby']);
    }
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
}
