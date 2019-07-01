import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor() { }
  menuList = [
    {
      id: 'lobby',
      picture: '/assets/imgs/btnLobbyNormal.png',
      pictureHover: '/assets/imgs/btnLobbyPressed.png',
      callback: this.lobbyCallback,
    },
    {
      id: 'history',
      picture: '/assets/imgs/btnHistoryNormal.png',
      pictureHover: '/assets/imgs/btnHistoryPressed.png',
      callback: this.historyCallback,
      nextUrl: '/history'
    },
    {
      id: 'account',
      picture: '/assets/imgs/btnAccountNormal.png',
      pictureHover: '/assets/imgs/btnAccountPressed.png',
      callback: this.accountCallback,
      nextUrl: '/account'
    },
    {
      id: 'contact',
      picture: '/assets/imgs/btnContactNormal.png',
      pictureHover: '/assets/imgs/btnContactPressed.png',
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

}
