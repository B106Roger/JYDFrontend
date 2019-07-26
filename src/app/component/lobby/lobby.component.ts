import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './../../services/auth-guard.service';
declare var $: any;

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})

export class LobbyComponent implements OnInit, AfterViewInit {

  menuSelected = 'slots';
  menuShow = false;
  menuList = [
    {
      value: 'slots',
      label: 'SLOTS'
    },
    {
      value: 'marry',
      label: 'MARRY SLOTS'
    },
    {
      value: 'poker',
      label: 'POKER GAMES'
    }
  ];
  images = [
    {
      gameName: 'fivedragons',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Dragons.png',
      gameCategory: 'slots',
      display: '1'
    },
    {
      gameName: 'fivekoi',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame5Koi.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'fiftydragons',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame50Dragons.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameAgent008.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'fortunes88',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame88Fortunes.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameAgent008.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGame88Fortunes.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'beanstalk',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBeanstalk.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'buffalo',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picGameBuffalo.png',
      gameCategory: 'slots',
      display: '2'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },
    {
      gameName: 'Game1',
      gameScript: 'url_string',
      gameImgUrl: '/assets/imgs/picBanner01.png',
      gameCategory: 'slots',
      display: '3'
    },

  ];


  constructor(private translate: TranslateService, private auth: AuthGuardService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    scrollTo(0, 40);
    setTimeout(() => { $('.carousel').carousel('next'); }, 1000);
  }

  getNormalGame() {
    return this.images.filter((e) => e.display === '2' && e.gameCategory === this.menuSelected);
  }
  getHotGame() {
    return this.images.filter((e) => e.display === '1' && e.gameCategory === this.menuSelected);
  }
  getCarouselGame() {
    return this.images.filter((e) => e.display === '3' && e.gameCategory === this.menuSelected);
  }
  getMenuSelect() {
    return this.menuList.filter((e) => e.value === this.menuSelected)[0];
  }
  setMenuSelect(menuOption: string) {
    this.menuSelected = menuOption;
  }
  toggleMenuOnShow() {
    this.menuShow = !this.menuShow;
  }

  setYesNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.yesImgNormal'));
  }

  setNoNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.noImgNormal'));
  }

  setYesPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.yesImgPressed'));
  }

  setNoPressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , this.translate.instant('lobby.noImgPressed'));
  }

  setCloseNormal(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , '/assets/imgs/btnLogoutLeaveNormal.png');
  }

  setClosePressed(e) {
    const self = e.currentTarget as HTMLElement;
    self.setAttribute('src' , '/assets/imgs/btnLogoutLeavePressed.png');
  }

  closeLogoutBox() {
    document.getElementById('logout-box').hidden = true;
  }

  logout() {
    this.auth.logout();
  }
  // 註冊滑鼠點擊拖曳 的 移動事件
  startScroll(e1: MouseEvent) {
    let originLocation = e1.clientX;
    const ele = document.querySelector('#normal-game-container');
    e1.currentTarget.addEventListener('mousemove', scrollX);
    e1.currentTarget.addEventListener('mouseup', endScroll);
    e1.currentTarget.addEventListener('mouseleave', endScroll);

    function scrollX(e2: MouseEvent) {
      const delta =  originLocation - e2.clientX ;
      ele.scrollLeft += delta;
      originLocation = e2.clientX;
    }
    function endScroll(e3: MouseEvent) {
      e3.currentTarget.removeEventListener('mousemove', scrollX);
      e3.currentTarget.removeEventListener('mouseup', endScroll);
    }
  }
}
