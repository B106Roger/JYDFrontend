import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConditionalExpr } from '@angular/compiler';

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
      img: '/assets/imgs/iconLanSc.png',
      label: 'Português'
    }
  ];
  constructor(public route: Router, public translate: TranslateService) {  }

  ngOnInit() {
    this.langChoosed = localStorage.getItem('lang');
    console.log(this.langChoosed);
    console.log(this.translate.currentLang);
    document.querySelector('body').id = this.translate.currentLang;
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
    if (this.translate.getLangs().includes(lang)) {
      this.langChoosed = lang;
    } else {
      this.langChoosed = this.translate.defaultLang;
    }
    this.translate.use(this.langChoosed);
    localStorage.setItem('lang', this.langChoosed);
    document.querySelector('body').id = this.translate.currentLang;
  }

  login() {
    console.log('account: ', this.account);
    if (this.account === '123' && this.password === '123') {
      localStorage.setItem('test' , '123');
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
