import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public translate: TranslateService, private route: Router) {  }

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
  navigateTo(e: Event) {
    if (e.type === 'touchend') {
      e.preventDefault();
    }

    const target = e.target as HTMLElement;
    if (target.nodeName === 'BUTTON') {
      this.route.navigate([target.dataset.href]);
    } else if (target.nodeName === 'IMG') {
      const actualTarget = target.parentElement  as HTMLElement;
      this.route.navigate([actualTarget.dataset.href]);
    }
  }
}
