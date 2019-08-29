import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from './../../services/fetch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('musicEle', {static: false})
  musicEle: ElementRef;
  msuic = false;
  sound = false;
  money: number;
  UserID = '';
  showPopper = false;
  constructor(public auth: AuthGuardService, public fetch: FetchService) { }

  ngOnInit() {
    this.msuic = (localStorage.getItem('music') === 'on' || null ? true : false);
    this.sound = (localStorage.getItem('sound') === 'on' ? true : false);
    this.getUserID();
    this.fetchMoney();
  }
  ngAfterViewInit() {
    this.setMusic();
    this.setSound();
  }

  getMusic() { return this.msuic; }

  getSound() { return this.sound; }

  showLogoutBox() {
    document.getElementById('logout-box').hidden = false;
  }

  showLeaveBox() {
    document.getElementById('leave-box').hidden = false;
  }

  setMusic() {
    const setValue = this.msuic === true ? 'on' : 'off';
    localStorage.setItem('music', setValue);
    // set music physically
    if (this.msuic) {
      this.musicEle.nativeElement.play().catch((err) => {
        this.playAfterInteract();
      });
    } else {
      this.musicEle.nativeElement.pause();
    }
  }

  setSound() {
    const setValue = this.sound === true ? 'on' : 'off';
    localStorage.setItem('sound', setValue);
    // set music physically
  }

  playAfterInteract() {
    const ele = document.getElementById('musicEle') as HTMLAudioElement;
    document.addEventListener('click', interact);
    document.addEventListener('touch', interact);

    function interact() {
      if (localStorage.getItem('music') === 'on') {
        ele.play();
      }
      document.removeEventListener('click', interact);
    }
  }

  fetchMoney() {
    if (!sessionStorage.getItem('amount')) {
      this.fetch.fetchAmount().then(responseJson => {
        // this.money = parseFloat(responseJson.account.amount);
        this.money = parseFloat(sessionStorage.getItem('amount'));
      });
    } else {
      this.money = parseFloat(sessionStorage.getItem('amount'));
    }
  }
  getUserID() {
    this.UserID = this.auth.getUserID();
  }

  togglePopper(e:Event) {
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
