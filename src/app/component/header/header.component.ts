import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
import { FetchService } from './../../services/fetch.service';
import { PopperContent } from 'ngx-popper';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @ViewChild('musicEle', {static: false})
  musicEle: ElementRef;
  @ViewChild('popperSetting', {static: false})
  popper: PopperContent;
  msuic = false;
  sound = false;
  money: number;
  UserID = '';
  constructor(public auth: AuthGuardService, public fetch: FetchService) { }

  ngOnInit() {
    this.msuic = (localStorage.getItem('music') === 'on' ? true : false);
    this.sound = (localStorage.getItem('sound') === 'on' ? true : false);
    this.getMoney();
  }
  ngAfterViewInit() {
    this.setMusic();
    this.setSound();
  }

  getMusic() { return this.msuic; }
  printMusic() { console.log(!this.msuic); }
  getSound() { return this.sound; }
  printSound() { console.log(!this.sound); }
  showLogoutBox() {
      document.getElementById('logout-box').hidden = false;
      this.popper.hide();
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

  getMoney() {
    this.fetch.fetchAmount().then(responseJson => {
      this.money = parseFloat(responseJson.account.amount);
      this.UserID = this.auth.getUserID();
    });
  }

  togglePopper() {
    if (this.popper.ariaHidden === 'false') {
      this.popper.hide();
    } else if (this.popper.ariaHidden === 'true') {
      this.popper.show();
    }
  }
}
