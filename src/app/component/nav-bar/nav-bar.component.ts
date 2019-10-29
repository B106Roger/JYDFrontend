import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

// tslint:disable: no-string-literal
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

  navigateTo(e: Event) {
    // 在touchend中 preventDefault 就不會觸發mousedown Event
    if (e.type === 'touchend') {
      e.preventDefault();
    }
    // 播按鈕音樂
    this.btnSound('sound_pressbtn01');

    // 跳轉路由
    const target = e.target as HTMLElement;
    if (target.nodeName === 'BUTTON') {
      this.route.navigate([target.dataset.href]);
    } else if (target.nodeName === 'IMG') {
      const actualTarget = target.parentElement  as HTMLElement;
      this.route.navigate([actualTarget.dataset.href]);
    }
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
