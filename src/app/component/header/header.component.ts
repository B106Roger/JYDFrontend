import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

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
  money = 999999999;
  UserID = '';
  constructor(public auth: AuthGuardService) { }

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
    fetch('https://jyddev.azurewebsites.net/api/AmountAPI.aspx', {
      method: 'GET',
      headers: {
        Currency: 'CNY',
        UserID: this.auth.getUserID(),
        Authorization: 'A602F295A6D547309A73AEC701ABC196'
      }
    }).then( response => {
      if ( !response.ok ) {
        throw Error( response.statusText );
      } else {
        return response.json();
      }
    }).then((responseJson) => {
      this.money = parseFloat(responseJson.Amount);
      this.UserID = this.auth.getUserID();
    });
  }
}
