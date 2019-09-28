import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from './../../services/fetch.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('musicEle', {static: false})
  musicEle: ElementRef;
  music = false;
  sound = false;
  money: number;
  UserID = '';
  showPopper = false;
  userAmountSubscription = null;
  constructor(public auth: AuthGuardService, public fetch: FetchService) { }

  ngOnInit() {
    this.music = (localStorage.getItem('music') === 'on' || null ? true : false);
    this.sound = (localStorage.getItem('sound') === 'on' ? true : false);
    this.setUserID();
    this.setUserAmount();
    this.userAmountSubscription = this.fetch.userAmount$.subscribe(userAmount => {
      sessionStorage.setItem('amount', userAmount);
      this.money = parseFloat(userAmount);
    });
    console.log(this.money);
  }

  ngOnDestroy() {
    this.userAmountSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.setMusic();
    this.setSound();
  }

  showLogoutBox() {
    document.getElementById('logout-box').hidden = false;
  }

  showLeaveBox() {
    document.getElementById('leave-box').hidden = false;
  }

  setMusic() {
    const setValue = this.music === true ? 'on' : 'off';
    localStorage.setItem('music', setValue);
    // set music physically
    if (this.music) {
      this.musicEle.nativeElement.play().catch((err) => {
        this.playAfterInteract();
      });
    } else {
      this.musicEle.nativeElement.pause();
    }
  }

  toggleMusic(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.music = !this.music;
    this.setMusic();
  }

  setSound() {
    const setValue = this.sound === true ? 'on' : 'off';
    localStorage.setItem('sound', setValue);
    // set music physically
  }

  toggleSound(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    this.sound = !this.sound;
    this.setSound();
  }

  playAfterInteract() {
    const ele = document.getElementById('musicEle') as HTMLAudioElement;
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
    if (this.showPopper) {
      this.closePopper();
    } else {
      this.openPopper();
    }
  }
  closePopper() {
    this.showPopper = false;
    document.getElementById('blurItem').hidden = true;
  }
  openPopper() {
    this.showPopper = true;
    document.getElementById('blurItem').hidden = false;
  }
  getShowPopper() {
    return this.showPopper;
  }
}
