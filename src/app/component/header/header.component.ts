import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from './../../services/fetch.service';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// tslint:disable: no-string-literal
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  music = false;
  sound = false;
  money: number;
  UserID = '';
  showPopper = false;
  userAmountSubscription = null;
  routerUrlSubscription = null;
  constructor(public auth: AuthGuardService, public fetch: FetchService, public route: Router) { }

  ngOnInit() {
    this.music = (localStorage.getItem('music') === 'on' || null ? true : false);
    this.sound = (localStorage.getItem('sound') === 'on' ? true : false);
    this.setUserID();
    this.setUserAmount();
    // 訂閱使用者金錢
    this.userAmountSubscription = this.fetch.userAmount$.subscribe(userAmount => {
      sessionStorage.setItem('amount', userAmount);
      this.money = parseFloat(userAmount);
    });
    // 訂閱當前路由
    this.routerUrlSubscription = this.route.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        const musicElement = document.querySelector('#music_lobbybg') as HTMLAudioElement;
        if (this.music === false || e.url.match('/game/') || e.url === '/' || e.url === '/?utm_source=pwa_app') {
          musicElement.pause();
          musicElement.currentTime = 0;
        }
      }
    });

    this.setMusic(this.music);
    this.setSound(this.sound);
  }

  ngOnDestroy() {
    if (this.userAmountSubscription !== null) {
      this.userAmountSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
  }

  showLogoutBox() {
    // 隱藏popper 跟背景顏色
    this.showPopper = false;
    document.getElementById('blurItem').hidden = true;

    document.getElementById('logout-box').hidden = false;
  }

  setMusic(musicVal: boolean) {
    const setValue = musicVal === true ? 'on' : 'off';
    this.music = musicVal;
    localStorage.setItem('music', setValue);

    const musicElement = document.querySelector('#music_lobbybg') as HTMLAudioElement;
    // set music physically
    if (musicVal) {
      musicElement.play().catch((err) => {
        this.playAfterInteract();
      });
    } else {
      musicElement.pause();
    }
  }

  toggleMusic(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.setMusic(!this.music);
    this.btnSound('sound_pressbtn03');
  }

  setSound(soundVal: boolean) {
    const setValue = soundVal === true ? 'on' : 'off';
    this.sound = soundVal;
    localStorage.setItem('sound', setValue);

    // set music physically
    window['sound'] = soundVal;
  }

  toggleSound(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.setSound(!this.sound);
    this.btnSound('sound_pressbtn03');
  }

  playAfterInteract() {
    const ele = document.querySelector('#music_lobbybg') as HTMLAudioElement;
    document.addEventListener('mousedown', interact);
    document.addEventListener('touchend', interact);

    function interact(e: Event) {
      if (e.type === 'touchend') {
        e.preventDefault();
      }
      if (localStorage.getItem('music') === 'on') {
        ele.play();
      }
      document.removeEventListener('mousedown', interact);
      document.removeEventListener('touchend', interact);
    }
  }

  setUserAmount() {
    if (sessionStorage.getItem('amount') !== null) {
      this.money = parseFloat(sessionStorage.getItem('amount'));
    }
  }
  setUserID() {
    this.UserID = this.auth.getUserID();
  }

  togglePopper(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.setPopperVisible(!this.showPopper);
    this.btnSound('sound_pressbtn03');
  }

  setPopperVisible(visible: boolean) {
    this.showPopper = visible;
    document.getElementById('blurItem').hidden = !this.showPopper;
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
