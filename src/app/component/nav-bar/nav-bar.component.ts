import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public translate: TranslateService) {  }

  menuList = [
    {
      id: 'lobby',
      picture: 'lobby.lobbyimg',
      picturepressed: 'lobby.lobbyimgpressed',
      callback: this.lobbyCallback,
    },
    {
      id: 'history',
      picture: 'lobby.historyimg',
      picturepressed: 'lobby.historyimgpressed',
      callback: this.historyCallback,
      nextUrl: '/history'
    },
    {
      id: 'account',
      picture: 'lobby.accountimg',
      picturepressed: 'lobby.accountimgpressed',
      callback: this.accountCallback,
      nextUrl: '/account'
    },
    {
      id: 'contact',
      picture: 'lobby.contactimg',
      picturepressed: 'lobby.contactimgpressed',
      callback: this.ContactCallback,
      nextUrl: '/contact'
    }
  ];
  lobbyCallback() {console.log('Lobbycallback'); }
  historyCallback() {console.log('Historycallback'); }
  accountCallback() {console.log('Accountcallback'); }
  ContactCallback() {console.log('Contactcallback'); }

  ngOnInit() {
  }

  setPicture(e: Event, srcURL: string) {
    const target = e.currentTarget as HTMLElement;
    const img = target.querySelector('img');
    img.src = this.translate.instant(srcURL);
  }
}
