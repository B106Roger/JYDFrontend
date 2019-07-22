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
      picture: 'lobby.lobbyimg',
      picturepressed: 'lobby.lobbyimgpressed',
      nextUrl: '/lobby'
    },
    {
      picture: 'lobby.historyimg',
      picturepressed: 'lobby.historyimgpressed',
      nextUrl: '/history'
    },
    {
      picture: 'lobby.accountimg',
      picturepressed: 'lobby.accountimgpressed',
      nextUrl: '/account'
    },
    {
      picture: 'lobby.contactimg',
      picturepressed: 'lobby.contactimgpressed',
      nextUrl: '/contact'
    }
  ];

  ngOnInit() {
  }

  setPicture(e: Event, srcURL: string) {
    const target = e.currentTarget as HTMLElement;
    const img = target.querySelector('img');
    img.src = this.translate.instant(srcURL);
  }
}
